const mongoose = require("mongoose");

const SecretsSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  role: {
    type: String,
  },
  secret: {
    type: Number,
  },
});

module.exports = mongoose.model("secrets", SecretsSchema);
