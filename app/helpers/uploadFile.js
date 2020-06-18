/**
 * Multer uploader helper
 */

const path = require("path");
const multer = require("multer");

// Set destination
const storage = multer.diskStorage({
  destination: "public/images/",
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  }
});

const checkFileType = (file, cb) => {
  // Allowed Exts
  const fileExtensions = /jpeg|jpg|png|gif/;
  // Check ext
  const extension = fileExtensions.test(
    path.extname(file.originalname).toLowerCase()
  );
  // Check mime
  const mimetype = fileExtensions.test(file.mimetype);

  if (extension && mimetype) {
    cb(null, true);
  } else {
    cb("Error: images only!");
  }
};

// Upload the image
exports.uploadFile = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single("image");
