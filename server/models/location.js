const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Location", locationSchema);
