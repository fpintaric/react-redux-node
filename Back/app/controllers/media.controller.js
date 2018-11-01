const Media = require("../models/media.model");

exports.create = (req, res) => {
  if (!req.body.mediaName || !req.file) {
    return res.status(400).send({
      message: "Missing params"
    });
  }

  const uploadedFile = req.file;
  const media = new Media({
    title: req.body.mediaName,
    file: {
      originalName: uploadedFile.originalname,
      encoding: uploadedFile.encoding,
      destination: uploadedFile.destination,
      fileName: uploadedFile.filename,
      path: uploadedFile.path,
      size: uploadedFile.size
    }
  });

  media
    .save()
    .then(data => {
      res.status(201).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Unknown server error"
      });
    });
};

exports.findAll = (req, res) => {
  Media.find()
    .then(medias => {
      res.send(medias);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Unknown error while retrieving media"
      });
    });
};
