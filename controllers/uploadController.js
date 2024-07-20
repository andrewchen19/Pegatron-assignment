const fs = require("fs");
const cloudinary = require("cloudinary").v2;

// step 1：store the file in tmp
// step 2：upload the file to cloudinary
// step 3：remove the file in tep
const uploadUserImage = async (req, res) => {
  //   console.log(req.files.image);

  if (!req.files) {
    return res.status(400).json({ msg: "No File upload" });
  }

  const productImage = req.files.image;
  // console.log(productImage)

  if (!productImage.mimetype.startsWith("image")) {
    return res.status(400).json({ msg: "Please upload image" });
  }

  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    return res
      .status(400)
      .json({ msg: "Please upload image smaller than 1MB" });
  }

  try {
    // step 1 & step 2
    const result = await cloudinary.uploader.upload(productImage.tempFilePath, {
      use_filename: true,
      folder: "pegatron",
    });
    // console.log(result);

    // step 3
    fs.rm(productImage.tempFilePath, (err) => {
      if (err) throw err;
      console.log("File removed successfully");
    });

    res.status(200).json({
      msg: "Uploaded successfully",
      image: { src: result.secure_url },
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  uploadUserImage,
};
