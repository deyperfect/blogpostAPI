/**
 * Centralized error handling middleware.
 * Must be registered LAST in server.js
 */
const errorHandler = (err, req, res, next) => {

console.log('errorHandler hit:', err?.message);
console.log('handler type:', typeof errorHandler);
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // 🔐 JWT: invalid token
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token. Please log in again.';
  }

  // 🔐 JWT: expired token
  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Your session has expired. Please log in again.';
  }

  // 🧠 Mongoose: duplicate key (e.g. duplicate email)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`;
    statusCode = 409;
  }

  // 🧠 Mongoose: validation error
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
    statusCode = 400;
  }

  // 🧠 Mongoose: invalid ObjectId
  if (err.name === 'CastError') {
    message = `Invalid ID format: ${err.value}`;
    statusCode = 400;
  }

  // 🐛 Log full error only in development
  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  }

  // 🛡 Hide internal errors in production
  if (process.env.NODE_ENV === 'production' && statusCode === 500) {
    message = 'Something went wrong. Please try again later.';
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;