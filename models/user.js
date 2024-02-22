const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }, //   hash: {
  //     type: String,
  //     required: true,
  //   },
  //   salt: {
  //     type: String,
  //     required: true,
  //   },
  // },
});

userSchema.virtual("url").get(function () {
  return `/catalog/user/${this_id}`;
});

module.exports = mongoose.model("User", userSchema);
