module.exports = app => {
  const user = require("../controllers/user.controller.js");

  app.post("/users/authenticate", user.authenticate);

  app.post("/users/register", user.register);

  app.get("/users", user.findAll);

  app.get("/current", user.getCurrent);

  app.get("/users/:userId", user.findOne);

  app.put("users/userId", user.update);

  app.delete("users/:userId", user._delete);
};
