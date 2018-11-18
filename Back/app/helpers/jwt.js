const expressJwt = require("express-jwt");
const userService = require("../services/user.service.js");
const logger = require("../../config/logger.config");

function jwt() {
  logger.log("info", "JWT");
  const secret = process.env.API_SECRET_KEY;
  return expressJwt({ secret, isRevoked }).unless({
    path: ["/users/authenticate", "/users/register/", "/download"]
  });
  //TODO: write a better solution for authenticating requests to download
}

async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub);

  if (!user) {
    return done(null, true);
  }

  done();
}

module.exports = jwt;
