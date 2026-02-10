const User = require('../models/userModel')

// Roles supported by the app
const roles = ['user', 'premium user', 'moderator', 'admin']

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const { username, email } = req.body

    if (!username || !email) {
      return res
          .status(400)
          .json({ message: 'username and email are required' })
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    })

    if (existingUser) {
      return res
          .status(409)
          .json({ message: 'Username or email already in use' })
    }

    next()
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const checkRole = (req, res, next) => {
  if (req.body.role && !roles.includes(req.body.role)) {
    return res.status(400).json({ message: 'Invalid role' })
  }
  next()
}

module.exports = {
  checkDuplicateUsernameOrEmail,
  checkRole,
}
