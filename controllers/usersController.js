const User = require("../models/User");
const Transaction = require("../models/Transaction");
const Category = require("../models/Category");
const Balance = require("../models/Balance");
const asyncHandler = rewquire("express-async-handler");
const bcrypt = require("bcrypt");

// @desc Get a user / User login
// @route GET /users
// @access Private
const getUser = asyncHandler(async (req, res) => {});

// @desc Create new user / User signup
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // Confirm data
  if (!username || !password) {
    return res
      .status(400)
      .json({ status: "fail", message: "All fields are required" });
  }

  // Check for duplicate
  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate) {
    return res
      .status(409)
      .json({ status: "fail", message: "Duplicate username" });
  }

  // Hash the recieved password
  const hashedPwd = await bcrypt.hash(password, 10); // 10 salt rounds

  const userObject = { username, password: hashedPwd };

  // Create and store new user
  const user = await User.create(userObject);

  if (user) {
    res.status(201).json({
      status: "success",
      message: `New user ${user.username} created`,
    });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
});

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {});

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {});

module.exports = {
  getUser,
  createNewUser,
  updateUser,
  deleteUser,
};
