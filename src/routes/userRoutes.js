const express = require("express");
const multer = require("multer");
const { uploadUserPhoto } = require("../utils/multer");
const router = express.Router();
const {
  signup,
  login,
  deleteUser,
  updateUser,
  getAllUsers,
} = require("../controller/userController");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const { verifyToken } = require("../utils/verifyToken");
const { authorization } = require("../utils/authorization");

// get routes
router.get("/", getAllUsers);

// Post Routes
router.post("/signup", signup);
router.post("/login", login);

// Update Routes
router.patch(
  "/:id/uploadphoto",
  verifyToken,
  authorization("user"),
  uploadUserPhoto,
  updateUser
);
router.patch("/:id", verifyToken, updateUser);

// Delete Routes
router.delete("/:id", verifyToken, authorization("admin", "user"), deleteUser);

module.exports = router;
