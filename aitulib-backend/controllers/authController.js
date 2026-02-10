const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const authConfig = require('../config/authConfig')
const emailService = require('../services/emailService')

const buildToken = (user) => {
  return jwt.sign(
      { id: user._id.toString(), role: user.role },
      authConfig.secret,
      { expiresIn: '24h' },
  )
}

exports.signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body

    if (!username || !email || !password) {
      return res
          .status(400)
          .json({ message: 'username, email, and password are required' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const allowRole = String(process.env.ALLOW_ROLE_ON_SIGNUP || '').toLowerCase() === 'true'
    const allowedRoles = ['user', 'premium user', 'moderator', 'admin']
    const safeRole = allowRole && role && allowedRoles.includes(role) ? role : 'user'

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: safeRole,
    })

    try {
      await emailService.sendWelcomeEmail({ to: user.email, username: user.username })
    } catch (e) {
      // Don't fail signup because of email issues
      console.warn('Welcome email failed:', e.message)
    }

    const token = buildToken(user)

    res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      accessToken: token,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.signin = async (req, res) => {
  try {
    const { username, email, password } = req.body

    if (!password || (!username && !email)) {
      return res
          .status(400)
          .json({ message: 'password and username or email are required' })
    }

    const query = email ? { email } : { username }
    const user = await User.findOne(query)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const passwordIsValid = await bcrypt.compare(password, user.password)
    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Invalid password' })
    }

    const token = buildToken(user)

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      accessToken: token,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
