const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const artistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  avatar: {
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
  created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

artistSchema.virtual("url").get(function () {
  return `/catalog/artist/${this._id}`;
});

artistSchema.virtual("date_of_birth_yyyy_mm_dd").get(function () {
  return DateTime.fromJSDate(this.date_of_birth).toISODate(); // format 'YYYY-MM-DD'
});

module.exports = mongoose.model("Artist", artistSchema);
