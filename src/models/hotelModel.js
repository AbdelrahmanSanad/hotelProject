const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const hotelSchema = new Schema(
  {
    hotelName: {
      type: String,
      required: [true, "Each Hotel must have a valid name"],
      trim: true,
      minlength: [10, "Hotel name must have length more than 20 characters"],
      validate: {
        validator: function (value) {
          return /^[a-zA-Z\s]+$/.test(value);
        },
        message: "Hotel names can't contain numbers",
      },
    },
    address: {
      country: { type: String, required: true },
      city: { type: String, required: true },
    },
    coordinates: { type: [Number] },
    rate: {
      type: Number,
      enum: {
        values: [1, 2, 3, 4, 5],
        message: "The rate must be integer beteween 1 to 5 only !!!",
      },
    },
    description: { type: String },
    pictures: { type: String },
    offers: { type: String },
    availableRooms: [
      {
        area: { type: Number, required: true },
        numberOfPersons: {
          type: Number,
          required: true,
          min: [1, "minimum number of persons in each room must be at least 1"],
        },
        nightPrice: { type: Number, required: true },
        status: {
          type: String,
          default: "available",
          enum: {
            values: ["available,reserved"],
            message: "The status is availabel or reserved",
          },
        },
        reservedIntervals: { type: Date },
        pictures: { type: String },
      },
    ],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

hotelSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "hotel",
});

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
