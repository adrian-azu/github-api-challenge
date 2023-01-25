const logger = require("../utils/logger");

exports.remover = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (ex) {
    return next(ex);
  }
};

module.exports.errorHandler = async (err, req, res, next) => {
  // Log the error to the console
  logger.error("API " + req.path, err);
  // Send a generic error response to the client
  res.status(500).json({ message: "An error occurred. Please try again later." });
};
