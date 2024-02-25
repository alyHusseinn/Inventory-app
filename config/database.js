const mongoose = require("mongoose");
const MONGODB_URL = require("./config").MONGODB_URL;

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.info("Connection to MongoDB is established Successfully!");
  })
  .catch((err) => {
    console.error(err);
  });
