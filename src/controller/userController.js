const User = require("../models/user");
const AppError = require("../utils/AppError");
const Joi = require("joi");
const bcrybt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res, next) => {
  const users = await User.find().select(["userName", "email", "role"]);

  res
    .json({
      message: "Users has been send",
      data: users,
      status: "succeed ",
    })
    .status(200);
};

//               *******************************   SiginUp   ************************************
const signup = async (req, res, next) => {
  const { userName, email, password, confirmPassword } = req.body;

  if (!userName || !email || !password || !confirmPassword)
    return next(new AppError("Please fill the required fields", 404));

  const newUser = new User({ userName, email, password, confirmPassword });
  await newUser.save();

  res.status(201).json({
    message: "The user has been added successfully",
    status: "Success",
  });
};

//         *************************************    SignIn   **************************************
const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return next(new AppError("This mail not regestired yet", 404));
  const datapass = user.password;
  const match = await bcrybt.compare(password, user.password);
  if (!match) {
    return next(new AppError("The password or email in't correct", 404));
  }

  // Token generation
  const token = jwt.sign({ user: user._id }, "hotelpppp");

  res
    .json({
      message: "User Has been logged successfullty",
      token: token,
    })
    .status(200);
};

//           *********************************  Get All Users  **************************************

const getOneUser = async (req, res, next) => {
  const users = await User.find();

  res.json({
    data: users,
    status: "Success",
    message: "Users data has been send",
  });
};

//           *********************************   Update User   **************************************

const updateUser = async (req, res, next) => {
  // console.log(req.user);
  // console.log(req.user._id, req.params.id);

  if (req.user._id.toString() !== req.params.id) {
    return next(new AppError("you aren't authorized to change this data", 403));
  }

  const { id } = req.params;

  const updatedUser = { ...req.body, picture: req.file?.filename };
  await User.findByIdAndUpdate(id, updatedUser);
  res
    .json({
      message: "The User data has been updated successfully",
      status: "Sucess",
    })
    .status(201);
};

//         ***********************************   Delete User   **************************************

const deleteUser = async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id, req.body);
  res
    .json({
      message: "The User data has been updated successfully",
      status: "Sucess",
    })
    .status(201);
};

module.exports = { signup, login, updateUser, deleteUser, getAllUsers };
