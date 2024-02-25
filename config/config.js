require("dotenv").config();

const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT;
const CLOUD_NAME = process.env.CLOUD_NAME;
const CLOUDINARY_KEY = process.env.CLOUDINARY_KEY;
const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;

module.exports = {
  MONGODB_URL,
  PORT,
  CLOUD_NAME,
  CLOUDINARY_KEY,
  CLOUDINARY_SECRET,
};
