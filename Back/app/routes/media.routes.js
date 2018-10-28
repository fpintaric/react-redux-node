var multer = require("multer");
var upload = multer({ dest: "uploads/" });

module.exports = app => {
  const media = require("../controllers/media.controller.js");
  app.post("/media", upload.single("mediaFile"), media.create);
};
