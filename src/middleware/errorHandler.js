/**
 * Error Handler Middleware
 * Catches unexpected errors that bubble up from routes/controllers/services.
 * Must be registered LAST, after all routes, in app.js.
 */

function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
}

module.exports = errorHandler;
