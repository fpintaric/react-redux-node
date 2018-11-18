const logger = require("../../config/logger.config");

module.exports = errorHandler = (err, req, res, next) => {
  if (typeof err === "string") {
    // custom application error
    logger.log("error", `Custom application error: ${err}`);
    return res.status(400).json({ message: err });
  }

  if (err.name === "ValidationError") {
    // mongoose validation error
    logger.log("error", `Validation error: ${err}`);
    return res.status(400).json({ message: err.message });
  }

  if (err.name === "UnauthorizedError") {
    // jwt authentication error
    logger.log("error", `JWT auth error: ${err}`);
    return res.status(401).json({ message: "Invalid Token" });
  }

  // default to 500 server error
  logger.log("error", `Unhandled server error: ${err}`);
  return res.status(500).json({ message: err.message });
};
