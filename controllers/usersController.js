const User = require("../models/User");
const Transaction = require("../models/Transaction");
const Category = require("../models/Category");
const Balance = require("../models/Balance");
const asyncHandler = rewquire("express-async-handler");
const bcrypt = require("bcrypt");

// @desc Get a user / User login
// @route GET /users
// @access Private
const getUser = asyncHandler(async (req, res) => {
    const { id } = req.body;

    const user = await User.findById(id).lean().exec();
    if (!user) {
        return res
            .status(400)
            .json({ status: "fail", message: "User not found" });
    }
    res.status(200).json({ status: "success", data: user });
});

// @desc Create new user / User signup
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Confirm data
    if (!username || !email || !password) {
        return res
            .status(400)
            .json({ status: "fail", message: "All fields are required" });
    }

    // Check for duplicate
    const duplicate = await User.findOne({ email }).lean().exec();
    if (duplicate) {
        return res
            .status(409)
            .json({ status: "fail", message: "Duplicate email" });
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
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, email, password } = req.body;

    let updateData = req.body;
    delete updateData.id;

    const user = await User.findById(id).exec();

    if (!user) {
        return res
            .status(400)
            .json({ status: "fail", message: "User not found" });
    }

    if (email) {
        // Check for duplicate email
        const duplicate = await User.findOne({ email }).lean().exec();
        if (duplicate && duplicate?._id.toString() !== id) {
            return res
                .status(409)
                .json({ status: "fail", message: "Email already in use" });
        }
    }

    if (password) {
        // Hash password
        updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        { $set: updateData }
    );

    if (updatedUser) {
        res.status(200).json({ status: "success", data: updatedUser });
    } else {
        res.status(400).json({
            status: "fail",
            message: "Something went wrong",
        });
    }
});

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
