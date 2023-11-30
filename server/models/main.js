const mongoose = require("mongoose");

const mainSchema = new mongoose.Schema({
  mainHeading: {
    type: String,
  },
  file: {
    type: mongoose.Schema.Types.Mixed,
  },
  // mainId: {
  //   type: String
  // }, //summary 
  createdAt: {
    type: Date,
    default: Date.now,
  }
});


module.exports = mongoose.model("Main", mainSchema);
