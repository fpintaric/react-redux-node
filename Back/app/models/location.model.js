const mongoose = require("mongoose");

const LocationSchema = mongoose.Schema(
  {
    city: String,
    address: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Location", LocationSchema);
