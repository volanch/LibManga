const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const emailService = require('../services/emailService')

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password')
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Создать пользователя (обычно админская операция; доступ ограничивается в routes)
exports.createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body

    if (!username || !email || !password) {
      return res
          .status(400)
          .json({ message: 'username, email, and password are required' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: role || 'user',
    })

    const newUser = await user.save()
    const userData = newUser.toObject()
    delete userData.password
    res.status(201).json(userData)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Change password (only self or admin in routes)
exports.changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: 'User not found' })

    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10)
      await user.save()
      res.json({ message: 'Password changed successfully' })
    } else {
      res.status(400).json({ message: 'Unknown password' })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.updateRole = async (req, res) => {
  try {
    const { role } = req.body
    const allowedRoles = ['user', 'premium user', 'moderator', 'admin']
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role' })
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { role },
        { new: true },
    ).select('-password')

    if (!updatedUser) return res.status(404).json({ message: 'User not found' })

    try {
      await emailService.sendRoleChangedEmail({
        to: updatedUser.email,
        username: updatedUser.username,
        role: updatedUser.role,
      })
    } catch (e) {
      console.warn('Role changed email failed:', e.message)
    }

    res.json(updatedUser)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).json({ message: 'User Not Found' })
    res.json({ message: 'User deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
