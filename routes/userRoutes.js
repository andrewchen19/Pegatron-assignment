const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { uploadUserImage } = require("../controllers/uploadController");

router.get("/", getAllUsers);
router.get("/:_id", getUser);
router.post("/", createUser);
router.patch("/:_id", updateUser);
router.delete("/:_id", deleteUser);

router.post("/uploads", uploadUserImage);

module.exports = router;
