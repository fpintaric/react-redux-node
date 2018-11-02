const Media = require("../models/media.model");
const logger = require("../../config/logger.config");
const fs = require("fs");

exports.create = (req, res) => {
  logger.log("info", "MediaController.create()");
  if (!req.body.mediaName || !req.file) {
    logger.log("error", "Missing params");
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
      logger.log("error", `Server error: ${err}`);
      res.status(500).send({
        message: err.message || "Unknown server error"
      });
    });
};

exports.findAll = (req, res) => {
  logger.log("info", "MediaController.findAll()");
  Media.find()
    .then(medias => {
      res.send(medias);
    })
    .catch(err => {
      logger.log("error", "Unknown error while retrieving media");
      res.status(500).send({
        message: err.message || "Unknown error while retrieving media"
      });
    });
};

exports.delete = (req, res) => {
  logger.log("info", "MediaController.delete()");
  Media.findById(req.params.mediaId)
    .lean()
    .then(media => {
      if (!media) {
        logger.log("info", `Media not found with id ${req.params.mediaId}`);
        return res.status(404).send({
          message: "Media not found with id " + req.params.mediaId
        });
      }
      fs.unlink(media.file.path, () => {
        Media.findByIdAndRemove(media._id).then(media => {
          if (!media) {
            logger.log("info", `Media not found with id ${req.params.mediaId}`);
            return res.status(404).send({
              message: "Media not found with id " + media._id
            });
          }
          res.send({ message: "Media deleted successfully" });
        });
      });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        logger.log("info", `Media not found with id ${req.params.mediaId}`);
        return res.status(404).send({
          message: "Media not found with id " + req.params.mediaId
        });
      }
      logger.log(
        "error",
        `Error deleting media with id: ${req.params.mediaId}`
      );
      return res.status(500).send({
        message: "Could not delete media with id " + req.params.mediaId
      });
    });
};
