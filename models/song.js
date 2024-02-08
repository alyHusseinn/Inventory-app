const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const songSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
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
  summary: {
    type: String,
  },
  artist: [{ type: Schema.Types.ObjectId, ref: "artist", required: true }],
  genre: [{ type: Schema.Types.ObjectId, ref: "genre", required: true }],
});

songSchema.virtual("url").get(function () {
  return `/catalog/song/${this._id}`;
});

module.exports = mongoose.model("Song", songSchema);
