const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  heading: String,
  text: String,
  author: String,
  color: {
    type: Number,
    default: 0
  },
  _id: Number
});

module.exports = mongoose.model("notes", notesSchema);