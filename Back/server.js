const PORT = 8080;
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("./config/logger.config");
const cors = require("cors");
const jwt = require("./app/helpers/jwt.js");
const errorHandler = require("./app/helpers/errorHandler.js");
const app = express();

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(jwt());

const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
  .connect(
    dbConfig.url,
    {
      useNewUrlParser: true
    }
  )
  .then(() => {
    logger.log("info", "Successfully connected to the database");
  })
  .catch(err => {
    logger.log(
      "error",
      `Could not connect to the database. Exiting now. Error:  ${err}`
    );
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "You hit the root route!" });
});

require("./app/routes/location.routes.js")(app);
require("./app/routes/media.routes.js")(app);
require("./app/routes/user.routes.js")(app);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.log("info", `App started on port ${PORT}`);
});
