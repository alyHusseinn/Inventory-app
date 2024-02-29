const User = require("../models/user");
const Song = require("../models/song");
const Genre = require("../models/genre");
const Artist = require("../models/artist");
const asyncHandler = require("express-async-handler");

exports.user_details = asyncHandler(async (req, res, next) => {
  const [user, songs, artists, genres] = await Promise.all([
    User.findById(req.params.id).exec(),
    Song.find({ created_by: req.params.id }).exec(),
    Artist.find({ created_by: req.params.id }).exec(),
    Genre.find({ created_by: req.params.id }).exec(),
  ]);

  res.render("user_details", {
    title: `${user.username} profile`,
    user: user,
    songs: songs,
    artists: artists,
    genres: genres,
  });
});
