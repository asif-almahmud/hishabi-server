const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  income: {
    type: [String],
    default: [],
  },
  expense: {
    type: [String],
    default: [],
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Category", categorySchema);
