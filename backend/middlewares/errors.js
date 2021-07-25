const ErrorHandler = require('../utils/errorHandler')

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statuscode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }
    if (process.env.NODE_ENV === 'PRODUCTION') {
        let error = { ...error }
        error.message = err.message
        //wrong mongoose object ID error
        if (err.name == 'CastError') {
            const message = `resourch not found. Invalid: ${err.path} `
            error = new ErrorHandler(message, 400)
        }
        // handling mongoose validation error
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message)
            error = new ErrorHandler(message, 400)
        }
        //handling mongoose dulpicate key errors
        if (err.code === 11000) {
            const message = `Dulpicate ${Object.keys(err.keyValue)} entered`
            error = new ErrorHandler(message, 400)
        }
        // handling wrong JWT errors
        if (err.name === 'JsonWebTokenError') {
            const message = 'JSON web token is invalid'
            error = new ErrorHandler(message, 400)
        }
        // handling expired JWT errors
        if (err.name === 'TokenExpiredError') {
            const message = 'JSON web token is expired'
            error = new ErrorHandler(message, 400)
        }
        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error'
        })
    }
}