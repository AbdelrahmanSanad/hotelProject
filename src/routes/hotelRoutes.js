const express = require("express");

const router = express.Router();

// Controllers Import

const {
  getAllHotels,
  newHotel,
  updateHotel,
  deleteHotel,
} = require("../controller/hotelController");
// get routes
router.get("/", getAllHotels);

// Post Routes
router.post("/", newHotel);

// Update Routes
router.patch("/:id", updateHotel);

// Delete Routes
router.delete("/", deleteHotel);

module.exports = router;
