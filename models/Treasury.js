const mongoose = require("mongoose");

const MonthsSchema = new mongoose.Schema({
  month: {
    type: String,
  },
  amount: {
    type: Number,
  },
  amount_status: {
    type: Boolean,
  },
  loan: {
    type: Number,
  },
  loan_status: {
    type: Boolean,
  },
});

const TreasurySchema = new mongoose.Schema({
  secret: {
    type: String,
  },
  months: [MonthsSchema],
});

module.exports = mongoose.model("treasury", TreasurySchema);
