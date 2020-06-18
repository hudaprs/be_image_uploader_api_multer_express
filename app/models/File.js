const mongoose = require("mongoose");

const FileSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("File", FileSchema);
