const mongoose = require("mongoose");

const Users = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  gender: { type: String },
  programme: { type: String },
  password: { type: String },
  confirm_password: { type: String },
  admitted: { type: String },
  graduation: { type: String },
  whatsapp: { type: String },
  emergency: { type: String },
  facebook: { type: String },
  linkedin: { type: String },
  email: { type: String },
  secret: { type: Number },
  role: { type: String },
});

module.exports = mongoose.model("users", Users);
