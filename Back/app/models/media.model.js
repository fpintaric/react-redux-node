const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema({
  title: String,
  file: {
    originalName: String,
    encoding: String,
    destination: String,
    fileName: String,
    path: String,
    size: Number
  }
});

module.exports = mongoose.model("Media", MediaSchema);
