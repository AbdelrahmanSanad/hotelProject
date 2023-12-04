const multer = require("multer");
const AppError = require("./AppError");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/users");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${file.originalname}.${ext}`);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image, please upload an image", 400), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

const uploadUserPhoto = upload.single("photo");
const uploadHotelPhotos = upload.array("photo");
module.exports = { uploadHotelPhotos, uploadUserPhoto };
