module.exports = app => {
  const locations = require("../controllers/location.controller.js");

  app.post("/locations", locations.create);

  app.get("/locations", locations.findAll);

  app.get("/locations/:locationId", locations.findOne);

  app.put("/locations/:locationId", locations.update);

  app.delete("/locations/:locationid", locations.delete);
};
