const ErrorResponse = require('../utils/ErrorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log for developer
  console.error(err.stack);

  // PG Unique Constraint (e.g., Email exists)
  if (err.code === '23505') {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 409);
  }

  // PG Validation Error
  if (err.code === '23514') {
    const message = 'Database constraint validation failed';
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: {
      code: error.errorCode || 'INTERNAL_SERVER_ERROR',
      message: error.message || 'Server Error'
    }
  });
};

module.exports = errorHandler;
