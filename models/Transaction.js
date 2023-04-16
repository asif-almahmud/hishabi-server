const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: String,
  date: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
