const ErrorResponse = require('../utils/ErrorResponse');

/**
 * Middleware to restrict access based on user roles
 * @param {Array} roles - Allowed roles for this route
 */
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(
                new ErrorResponse(
                    `User role ${req.user.role} is not authorized to access this route`,
                    403
                )
            );
        }
        next();
    };
};

module.exports = authorize;
