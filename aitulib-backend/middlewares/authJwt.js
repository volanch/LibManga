const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const authConfig = require('../config/authConfig')

const parseToken = (req) => {
  const header = req.headers.authorization || req.headers['x-access-token']
  if (!header) {
    return null
  }

  if (header.startsWith('Bearer ')) {
    return header.slice(7).trim()
  }

  return header.trim()
}

const verifyToken = (req, res, next) => {
  const token = parseToken(req)
  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    req.userId = decoded.id
    req.userRole = decoded.role
    next()
  })
}

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('role')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin role required' })
    }

    next()
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const isPremium = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('role')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (user.role !== 'premium user' && user.role !== 'admin') {
      return res.status(403).json({ message: 'Premium role required' })
    }

    next()
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = {
  verifyToken,
  isAdmin,
  isPremium,
}
