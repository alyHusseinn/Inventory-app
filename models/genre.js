const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const genreSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    min: 5,
  },
});

categorySchema.virtual("url").get(function () {
  return `/catalog/genre/${this_id}`;
});

module.exports = mongoose.model("Genre", genreSchema);
