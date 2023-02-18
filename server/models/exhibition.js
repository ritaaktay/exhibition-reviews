const mongoose = require("mongoose");

const exhibitionSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  location_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Location",
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Exhibition", exhibitionSchema);
