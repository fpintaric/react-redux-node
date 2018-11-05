const Location = require("../models/location.model.js");
const logger = require("../../config/logger.config");

exports.create = (req, res) => {
  logger.log("info", "LocationController.create()");
  if (!req.body.city || !req.body.address) {
    logger.log("warn", "Missing params");
    return res.status(400).send({
      message: "Missing params"
    });
  }

  const location = new Location({
    city: req.body.city,
    address: req.body.address
  });

  location
    .save()
    .then(data => {
      logger.log("info", "Location saved, sending back res 201");
      res.status(201).send(data);
    })
    .catch(err => {
      logger.log("error", `Error while saving location: ${err}`);
      res.status(500).send({
        message: err.message || "Unknown error while creating location"
      });
    });
};

exports.findAll = (req, res) => {
  logger.log("info", "LocationController.findAll()");
  Location.find()
    .then(locations => {
      logger.log("info", "Sending all locations to user...");
      res.send(locations);
    })
    .catch(err => {
      logger.log("error", `Error while retrieving locations: ${err}`);
      res.status(500).send({
        message: err.message || "Unknown error while retrieving locations"
      });
    });
};

exports.findOne = (req, res) => {
  logger.log("info", "LocationController.findOne()");
  Location.findById(req.params.locationId)
    .then(location => {
      if (!location) {
        logger.log(
          "info",
          `Cannot find location with id: ${req.params.locationId}`
        );
        return res.status(404).send({
          message: "Cannot find location with id: " + req.params.locationId
        });
      }
      res.send(location);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        logger.log(
          "info",
          `Cannot find location with id: ${req.params.locationId}`
        );
        return res.status(404).send({
          message: "Cannot find location with id: " + req.params.locationId
        });
      }
      logger.log(
        "error",
        `Error while finding location with id: ${req.params.locationId}`
      );
      return res.status(500).send({
        message: "Error retrieving location with id " + req.params.locationId
      });
    });
};

exports.update = (req, res) => {
  logger.log("info", "LocationController.update()");
  if (!req.body.city || !req.body.address) {
    logger.log("error", "Empty params");
    return res.status(400).send({
      message: "Empty params"
    });
  }
  Location.findByIdAndUpdate(
    req.params.locationId,
    {
      city: req.body.city,
      address: req.body.address
    },
    { new: true }
  )
    .then(location => {
      if (!location) {
        logger.log(
          "info",
          `Cannot find location with id: ${req.params.locationId}`
        );
        return res.status(404).send({
          message: "Location not found with id " + req.params.locationId
        });
      }
      res.send(location);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        logger.log(
          "info",
          `Cannot find location with id: ${req.params.locationId}`
        );
        return res.status(404).send({
          message: "Location not found with id " + req.params.locationId
        });
      }
      logger.log(
        "error",
        `Error updating location with id: ${req.params.locationId}`
      );
      return res.status(500).send({
        message: "Error updating location with id " + req.params.locationId
      });
    });
};

exports.delete = (req, res) => {
  logger.log("info", "LocationController.delete()");
  Location.findByIdAndRemove(req.params.locationId)
    .then(location => {
      if (!location) {
        logger.log(
          "info",
          `Cannot find location with id: ${req.params.locationId}`
        );
        return res.status(404).send({
          message: "Location not found with id " + req.params.locationId
        });
      }
      res.send({ message: "Location deleted successfully" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        logger.log(
          "info",
          `Cannot find location with id: ${req.params.locationId}`
        );
        return res.status(404).send({
          message: "Location not found with id " + req.params.locationId
        });
      }
      logger.log(
        "error",
        `Could not delete location with id: ${req.params.locationId}`
      );
      return res.status(500).send({
        message: "Could not delete location with id " + req.params.locationId
      });
    });
};
