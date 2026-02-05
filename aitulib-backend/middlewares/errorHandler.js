module.exports = (err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            error: err.message
        });
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            error: 'Duplicate field value entered'
        });
    }

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        return res.status(404).json({
            success: false,
            error: 'Invalid blog post ID format'
        });
    }

    // Default error
    res.status(status).json({
        success: false,
        error: message
    });
};

