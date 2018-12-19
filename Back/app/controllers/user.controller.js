const userService = require("../services/user.service.js");
const sendRegistrationMail = require("../services/mail.service.js");
const logger = require("../../config/logger.config");

exports.authenticate = (req, res, next) => {
  userService
    .authenticate(req.body)
    .then(user =>
      user
        ? res.json(user)
        : res.status(400).json({ message: "Username or password is incorrect" })
    )
    .catch(err => next(err));
};

exports.register = (req, res, next) => {
  logger.log("info", "UserController.register()");
  userService
    .create(req.body)
    .then(() => {
      sendRegistrationMail(req.body.username, req.body.email);
      res.json({});
    })
    .catch(err => next(err));
};

exports.findAll = (req, res, next) => {
  userService
    .getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
};

exports.getCurrent = (req, res, next) => {
  userService
    .getById(req.user.sub)
    .then(user => (user ? res.json(user) : res.sendStatus(404)))
    .catch(err => next(err));
};

exports.findOne = (req, res, next) => {
  userService
    .getById(req.params.id)
    .then(user => (user ? res.json(user) : res.sendStatus(404)))
    .catch(err => next(err));
};

exports.update = (req, res, next) => {
  userService
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
};

exports._delete = (req, res, next) => {
  userService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
};
