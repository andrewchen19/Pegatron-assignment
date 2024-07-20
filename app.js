const express = require("express");
const app = express();

const path = require("path");
const notFound = require("./middlewares/notFound");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./db/connect");
require("dotenv").config();

const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

// when upload a file, the file will be accessible from req.files
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// middlewares
app.use(express.static(path.resolve(__dirname, "./client/dist")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
// safeguard web applications from potential security threats, such as XSS attacks
app.use(helmet());
// protect MongoDB databases from malicious attempts to manipulate data and helps ensure the integrity of data storage and retrieval
app.use(mongoSanitize());
app.use(fileUpload({ useTempFiles: true }));

// routes
app.use("/api/v1/users", userRoutes);

// serve index.html for all routes (apart from API)
// front-end routes pick it up form here
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

// custom global middleware (after all routes)
app.use(notFound);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.CONNECT_STRING);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
