const mongoose = require("mongoose");

const balanceSchema = new mongoose.Schema({
  totalIncome: Number,
  totalExpense: Number,
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Balance", balanceSchema);
