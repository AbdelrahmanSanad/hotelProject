const Hotel = require("../models/hotelModel");
// const express = require("express");

const AppError = require("../utils/AppError");
const { ApiFeatures } = require("../utils/apiFeature");
// Get All hotels

const getAllHotels = async (req, res, next) => {
  const hoteFeatures = new ApiFeatures(Hotel.find(), req.query)
    .filter()
    .sort()
    .limit()
    .pagination();

  const hotels = await hoteFeatures.query;
  res
    .status(201)
    .json({ Status: "Sucees", message: "The hotels is sent", data: hotels });
};

// Create Hotels

const newHotel = async (req, res, next) => {
  const hotel = req.body;
  console.log(hotel);
  const newHotel = new Hotel(hotel);
  await newHotel.save();
  res
    .json({
      status: "succeed",
    })
    .status(200);
};

// Update Hotel Data
const updateHotel = async (req, res, next) => {
  const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body);
  res.send(await Hotel.findById(req.params.id));
};

// Delete hotel data
const deleteHotel = async (req, res, next) => {
  await Hotel.findByIdAndDelete(req.params.id, req.body);

  res.send("The hotel data has been removed sucessfully");
};

module.exports = { getAllHotels, newHotel, updateHotel, deleteHotel };
