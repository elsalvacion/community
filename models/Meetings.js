const mongoose = require("mongoose");

const ComingSchema = new mongoose.Schema({
  email: { type: String },
  firstName: { type: String },
  lastName: { type: String },
});

const MeetingSchema = new mongoose.Schema({
  subject: {
    type: String,
  },
  time: {
    type: String,
  },
  message: { type: String },
  link: { type: String },
  date: { type: String },
  coming: [ComingSchema],
});

module.exports = mongoose.model("meetings", MeetingSchema);
