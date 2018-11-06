const Media = require("../models/media.model");
const logger = require("../../config/logger.config");
const fs = require("fs");

exports.create = (req, res) => {
  logger.log("info", "MediaController.create()");
  if (!req.body.title || !req.file) {
    logger.log("error", "Missing params");
    return res.status(400).send({
      message: "Missing params"
    });
  }

  const uploadedFile = req.file;
  const media = new Media({
    title: req.body.title,
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

exports.findOne = (req, res) => {
  logger.log("info", "MediaController.findOne()");
  Media.findById(req.params.mediaId)
    .then(media => {
      if (!media) {
        logger.log("info", `Cannot find media with id: ${req.params.mediaId}`);
        return res.status(404).send({
          message: "Cannot find media with id: " + req.params.mediaId
        });
      }
      res.send(media);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        logger.log("info", `Cannot find media with id: ${req.params.mediaId}`);
        return res.status(404).send({
          message: "Cannot find media with id: " + req.params.mediaId
        });
      }
      logger.log(
        "error",
        `Error while finding media with id: ${req.params.mediaId}`
      );
      return res.status(500).send({
        message: "Error retrieving media with id " + req.params.mediaId
      });
    });
};

exports.update = (req, res) => {
  logger.log("info", "MediaController.update()");
  if (!req.body.title && !req.file) {
    logger.log("error", "Empty params");
    return res.status(400).send({
      message: "Empty params"
    });
  }
  Media.findByIdAndUpdate(
    req.params.mediaId,
    {
      title: req.body.title
    },
    { new: true }
  )
    .then(media => {
      if (!media) {
        logger.log("info", `Cannot find media with id: ${req.params.mediaId}`);
        return res.status(404).send({
          message: "media not found with id " + req.params.mediaId
        });
      }
      res.send(media);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        logger.log("info", `Cannot find media with id: ${req.params.mediaId}`);
        return res.status(404).send({
          message: "media not found with id " + req.params.mediaId
        });
      }
      logger.log(
        "error",
        `Error updating media with id: ${req.params.mediaId}`
      );
      return res.status(500).send({
        message: "Error updating media with id " + req.params.mediaId
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
      if (media.file) {
        fs.unlink(media.file.path, () => {
          Media.findByIdAndRemove(media._id).then(media => {
            if (!media) {
              logger.log(
                "info",
                `Media not found with id ${req.params.mediaId}`
              );
              return res.status(404).send({
                message: "Media not found with id " + media._id
              });
            }
            res.send({ message: "Media deleted successfully" });
          });
        });
      } else {
        Media.findByIdAndRemove(media._id).then(media => {
          if (!media) {
            logger.log("info", `Media not found with id ${req.params.mediaId}`);
            return res.status(404).send({
              message: "Media not found with id " + media._id
            });
          }
          res.send({ message: "Media deleted successfully" });
        });
      }
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
