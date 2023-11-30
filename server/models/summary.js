const mongoose = require("mongoose");

const summarySchema = new mongoose.Schema({
  mainHeading: {
    type: String,
  },
  file: {
    type: mongoose.Schema.Types.Mixed,
    // type: String,
  },
  mainId: {
    type: String
  }, 
  createdAt: {
    type: Date,
    default: Date.now,
  }
});


module.exports = mongoose.model("Summary", summarySchema);
