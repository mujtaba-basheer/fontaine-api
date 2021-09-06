import AppError from "../utils/app-error.js";

// for unspecified/unfound routes
export const notFound = (req, res, next) => {
  return next(new AppError("Route does not exist.", 404));
};

// error handler middleware
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode);
  res.status(statusCode).json({
    message: err.message,
    // adding error stack in development environment
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
