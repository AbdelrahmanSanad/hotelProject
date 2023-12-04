const express = require("express");
const app = express();
const port = 8000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
// to read the Json and write
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes Reference
const hotelRoutes = require("./src/routes/hotelRoutes");
const userRoutes = require("./src/routes/userRoutes");

// End points
app.use("/hotel", hotelRoutes);
app.use("/user", userRoutes);

//Database connection
mongoose
  .connect("mongodb://127.0.0.1:27017/hotelproject")
  .then(() => {
    console.log("Database has been connected");
  })
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`You app is now running on port ${port}`);
});
