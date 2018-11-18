var multer = require("multer");
var upload = multer({ dest: "uploads/" });

module.exports = app => {
  const media = require("../controllers/media.controller.js");

  app.post("/media", upload.single("file"), media.create);

  app.get("/media", media.findAll);

  app.get("/media/:mediaId", media.findOne);

  app.put("/media/:mediaId", media.update);

  app.delete("/media/:mediaId", media.delete);

  app.get("/download/", media.download);
};
