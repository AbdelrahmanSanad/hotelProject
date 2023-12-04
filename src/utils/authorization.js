const AppError = require("./AppError");

const authorization = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          "You don't have the permssion to perfrom that request",
          403
        )
      );
    }
    next();
  };
};

module.exports = { authorization };
