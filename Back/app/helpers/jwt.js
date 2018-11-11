const expressJwt = require("express-jwt");
const config = require("../../config/api.config.json");
const userService = require("../services/user.service.js");
const logger = require("../../config/logger.config");

function jwt() {
  logger.log("info", "JWT");
  const secret = config.secret;
  return expressJwt({ secret, isRevoked }).unless({
    path: ["/users/authenticate", "/users/register/"]
  });
}

async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub);

  if (!user) {
    return done(null, true);
  }

  done();
}

module.exports = jwt;
