const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  exhibition_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Exhibition",
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  content: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Review", reviewSchema);
