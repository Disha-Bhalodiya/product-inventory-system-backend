const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log details for debugging (only in development)
  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  }

  // 1. Mongoose Bad ObjectID (CastError)
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    error = new Error(message);
    error.statusCode = 444; // Resource not found
  }

  // 2. Mongoose Duplicate Key Code 11000
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `A product with that ${field} already exists. Duplicates not allowed.`;
    error = new Error(message);
    error.statusCode = 400;
  }

  // 3. Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message).join(', ');
    error = new Error(message);
    error.statusCode = 400;
  }

  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    status: statusCode,
    message: error.message || 'Internal Server Error',
    data: process.env.NODE_ENV === 'production' ? null : { stack: err.stack }
  });
};

export default errorHandler;
