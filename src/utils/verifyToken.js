const Jwt = require("jsonwebtoken");
const User = require("../models/user");
const AppError = require("../utils/AppError");

/// Verify token to assure the user logging in
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  const userId = Jwt.verify(token, "hotelpppp");
  // console.log(userId);
  const user = await User.findById(userId.user);
  // console.log(user);
  if (!user)
    return new AppError("You aren't logged in please login to continue", 403);
  req.user = user;

  next();
};

module.exports = { verifyToken };
