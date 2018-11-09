const config = require("../../config/api.config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const logger = require("../../config/logger.config");

const User = require("../models/user.model");

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function authenticate({ username, password }) {
  logger.log("info", "UserService.authenticate()");
  console.log(username);
  console.log(password);
  const user = await User.findOne({ username });
  if (user && bcrypt.compareSync(password, user.password)) {
    const { hash, ...userWithoutHash } = user.toObject();
    const token = jwt.sign({ sub: user.id }, config.secret, {
      expiresIn: "24h"
    });
    return {
      ...userWithoutHash,
      token
    };
  }
}

async function getAll() {
  return await User.find().select("-hash");
}

async function getById(id) {
  return await User.findById(id).select("-hash");
}

async function create(userParam) {
  logger.log("info", "UserService.create()");
  console.log(userParam);
  if (await User.findOne({ username: userParam.username })) {
    throw `Username ${userParam.username} is already taken`;
  }

  const user = new User(userParam);

  if (userParam.password) {
    user.password = bcrypt.hashSync(userParam.password, 10);
  }

  await user.save();
}

async function update(id, userParam) {
  const user = await User.findById(id);

  if (!user) throw "User not found";

  if (
    user.username !== userParam.username &&
    (await User.findOne({ username: userParam.username }))
  ) {
    throw `Username ${userParam.username} is already taken`;
  }

  if (userParam.password) {
    userParam.password = bcrypt.hashSync(userParam.password, 10);
  }

  Object.assign(user, userParam);

  await user.save();
}

async function _delete(id) {
  await User.findByIdAndRemove(id);
}
