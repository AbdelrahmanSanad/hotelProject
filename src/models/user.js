const mongoose = require("mongoose");
const Joi = require("joi");
const { Schema } = mongoose;
const validator = require("validator").default;
const bcrybt = require("bcrypt");
const userSchema = new Schema({
  userName: { type: String, required: true },
  role: {
    type: String,
    enum: {
      values: ["admin", "user"],
      message: "The Role must be either user or admin",
    },
    default: "user",
  },
  picture: { type: String },
  email: {
    type: String,
    validate: [validator.isEmail, "Please insert a valid mail"],
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: [true, "Please Provide a password"],
    minlength: [8, "The password must be at least 8 characters"],
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "The password doesn't match",
    },
  },
});

// middleware validation
userSchema.pre("save", async function (next) {
  this.password = await bcrybt.hash(this.password, 10);
  this.confirmPassword = undefined;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
