const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const artistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return /(https?:\/\/(?:www\.)?)?(open\.spotify|soundcloud)\.com\/.*$/.test(
          v
        );
      },
      message: (props) =>
        `${props.value} is not a valid Spotify or SoundCloud URL!`,
    },
  },
  date_of_birth: {
    type: Date,
  },
});

artistSchema.virtual("url").get(function () {
  return `/catalog/artist/${this._id}`;
});

module.exports = mongoose.model("Artist", artistSchema);
