const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  hashedpassword: {
    type: String,
    required: true,
  },
});

userSchema.virtual("url").get(function () {
  return `/catalog/user/${this_id}`;
});

module.exports = mongoose.model("User", userSchema);
