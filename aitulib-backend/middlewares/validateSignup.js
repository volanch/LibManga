const validator = require('validator')

const validateSignupData = (req, res, next) => {
    const { username, email, password } = req.body
    const errors = []

    if (!username || typeof username !== 'string') {
        errors.push('Username is required and must be a string')
    } else {
        const trimmedUsername = username.trim()
        if (trimmedUsername.length < 3) {
            errors.push('Username must be at least 3 characters long')
        }
        if (trimmedUsername.length > 30) {
            errors.push('Username must not exceed 30 characters')
        }
        if (!/^[a-zA-Z0-9_-]+$/.test(trimmedUsername)) {
            errors.push('Username can only contain letters, numbers, hyphens, and underscores')
        }
    }

    if (!email || typeof email !== 'string') {
        errors.push('Email is required and must be a string')
    } else if (!validator.isEmail(email)) {
        errors.push('Please provide a valid email address')
    } else {
        // Normalize email
        req.body.email = validator.normalizeEmail(email)
    }

    // Validate password
    if (!password || typeof password !== 'string') {
        errors.push('Password is required and must be a string')
    } else {
        if (password.length < 6) {
            errors.push('Password must be at least 6 characters long')
        }
        if (password.length > 128) {
            errors.push('Password must not exceed 128 characters')
        }
        // Check for password strength
        if (!validator.isStrongPassword(password, {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })) {
            errors.push('Password does not meet minimum requirements')
        }
    }

    // Validate role if provided
    if (req.body.role) {
        const allowedRoles = ['user', 'premium user', 'moderator', 'admin']
        if (!allowedRoles.includes(req.body.role)) {
            errors.push('Invalid role specified')
        }
    }

    // If there are validation errors, return them
    if (errors.length > 0) {
        return res.status(400).json({
            message: errors[0],
            errors: errors
        })
    }

    // Trim username for consistency
    if (username) {
        req.body.username = username.trim()
    }

    next()
}

module.exports = validateSignupData