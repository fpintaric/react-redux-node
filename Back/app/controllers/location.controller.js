const Location = require("../models/location.model.js");

exports.create = (req, res) => {
  console.log(req.body);
  if (!req.body.city || !req.body.address) {
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
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Unknown error while creating location"
      });
    });
};

exports.findAll = (req, res) => {
  Location.find()
    .then(locations => {
      res.send(locations);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Unknown error while retrieving locations"
      });
    });
};

exports.findOne = (req, res) => {
  Location.findById(req.params.locationId)
    .then(location => {
      if (!location) {
        return res.status(404).send({
          message: "Cannot found location with id: " + req.params.locationId
        });
      }
      res.send(location);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Cannot found location with id: " + req.params.locationId
        });
      }
      return res.status(500).send({
        message: "Error retrieving location with id " + req.params.locationId
      });
    });
};

exports.update = (req, res) => {
  if (!req.body.content) {
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
        return res.status(404).send({
          message: "Location not found with id " + req.params.locationId
        });
      }
      res.send(location);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Location not found with id " + req.params.locationId
        });
      }
      return res.status(500).send({
        message: "Error updating location with id " + req.params.locationId
      });
    });
};

exports.delete = (req, res) => {
  Location.findByIdAndRemove(req.params.locationId)
    .then(location => {
      if (!location) {
        return res.status(404).send({
          message: "Location not found with id " + req.params.locationId
        });
      }
      res.send({ message: "Location deleted successfully" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Location not found with id " + req.params.locationId
        });
      }
      return res.status(500).send({
        message: "Could not delete location with id " + req.params.locationId
      });
    });
};
