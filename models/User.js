const mongoose = require("mongoose");
const { Schema } = mongoose;
const { GENDER, OCCUPATION } = require("../utils/constants");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 20,
    },
    gender: {
      type: String,
      enum: {
        values: Object.values(GENDER),
        message: "{VALUE} is not supported",
      },
      default: GENDER.MALE,
    },
    birthday: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      enum: {
        values: Object.values(OCCUPATION),
        message: "{VALUE} is not supported",
      },
      default: OCCUPATION.STUDENT,
    },
    phoneNumber: {
      type: String,
      required: true,
      match: /^09\d{8}$/,
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dhrtfibhx/image/upload/v1721266453/pegatron/default_wozlch.jpg",
    },
  },
  // automatically generate createdAt and updatedAt fields for the document
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
