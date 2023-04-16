const mongoose = require("mongoose");
const Category = require("./Category");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // transactions: [{ type: mongoose.Types.ObjectId, ref: "Transaction" }],
});

module.exports = mongoose.model("User", userSchema);
