const PORT = 8080;

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "You hit the root route!" });
});

require("./app/routes/location.routes.js")(app);

app.listen(PORT, () => {
  console.log("Server listening on port: ", PORT);
});
