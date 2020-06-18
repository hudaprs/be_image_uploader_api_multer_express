const router = require("express").Router();
const {
  getImages,
  upload,
  deleteFile
} = require("../app/controllers/FileController");

router.get("/", getImages);
router.post("/upload", upload);
router.delete("/:id", deleteFile);

module.exports = router;
