const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  mainHeading: {
    type: String,
  },
  file: {
    type: mongoose.Schema.Types.Mixed,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});


module.exports = mongoose.model("Test", testSchema);
