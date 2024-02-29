const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const genreSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    min: 5,
  },
  created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

genreSchema.virtual("url").get(function () {
  return `/catalog/genre/${this._id}`;
});

module.exports = mongoose.model("Genre", genreSchema);
