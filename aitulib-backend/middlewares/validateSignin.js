const validator = require('validator')

const validateSigninData = (req, res, next) => {
    const { username, email, password } = req.body
    const errors = []

    // Check that either username or email is provided
    if (!username && !email) {
        errors.push('Either username or email is required')
    }

    // Validate email if provided
    if (email) {
        if (typeof email !== 'string') {
            errors.push('Email must be a string')
        } else if (!validator.isEmail(email)) {
            errors.push('Please provide a valid email address')
        } else {
            // Normalize email
            req.body.email = validator.normalizeEmail(email)
        }
    }

    // Validate username if provided
    if (username) {
        if (typeof username !== 'string') {
            errors.push('Username must be a string')
        } else {
            const trimmedUsername = username.trim()
            if (trimmedUsername.length < 3) {
                errors.push('Username must be at least 3 characters long')
            }
            if (trimmedUsername.length > 30) {
                errors.push('Username must not exceed 30 characters')
            }
            // Trim username for consistency
            req.body.username = trimmedUsername
        }
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
    }

    // If there are validation errors, return them
    if (errors.length > 0) {
        return res.status(400).json({
            message: errors[0],
            errors: errors
        })
    }

    next()
}

module.exports = validateSigninData