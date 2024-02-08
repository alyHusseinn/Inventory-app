const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  shared_songs: [{ "type": Schema.Types.ObjectId, "ref": "Genre", required: true }], 
});

userSchema.virtual("url").get(function () {
  return `/catalog/user/${this._id}`;
});

module.exports = mongoose.model("User", userSchema);
