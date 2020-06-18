const { success, error } = require("../helpers/responseApi");
const { uploadFile } = require("../helpers/uploadFile");
const File = require("../models/File");
const fs = require("fs").promises;

/**
 * @desc    Get All Images
 * @method  GET api/images
 * @access  public
 */
exports.getImages = async (req, res) => {
  try {
    const files = await File.find();

    res.status(200).json(success("File list", files, res.statusCode));
  } catch (err) {
    console.error(err.message);
    res.status(500).json(error("Server error", res.statusCode));
  }
};

/**
 * @desc    Upload an Image
 * @method  POST api/images/upload
 * @access  public
 */
exports.upload = async (req, res) => {
  try {
    // Upload file
    uploadFile(req, res, async (err) => {
      if (err) {
        return res.status(400).json(error(err, res.statusCode));
      } else {
        if (req.file === undefined)
          return res
            .status(422)
            .json(error("Image is required", res.statusCode));

        const { filename, path } = req.file;

        // Save to database
        let file = await File.create({
          name: filename,
          path
        });
        file = await file.save();

        return res
          .status(201)
          .json(success("File uploaded", file, res.statusCode));
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json(error("Server error", res.statusCode));
  }
};

/**
 * @desc    Delete image
 * @method  POST api/images/:id
 * @param   {number} id
 * @access  public
 */
exports.deleteFile = async (req, res) => {
  const { id } = req.params;
  try {
    let file = await File.findById(id);
    if (!file)
      return res.status(404).json(error("File not found", res.statusCode));

    // Remove file from storage
    await fs.unlink(file.path);

    // Remove from database
    const deletedFile = await File.findByIdAndRemove(id);

    res.status(200).json(success("File removed", deletedFile, res.statusCode));
  } catch (err) {
    console.error(err.message);
    res.status(500).json(error("Server error", res.statusCode));
  }
};
