const Song = require("../models/song");
const Artist = require("../models/artist");
const Genre = require("../models/genre");
const user = require("../models/user");
// instead of doing try catch on all functions we can put them in this fucntion
// asyncHandler -> it wraps the functions with try and catch
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const [numSongs, numArtists, numGenres] = await Promise.all([
    Song.countDocuments().exec(),
    Artist.countDocuments().exec(),
    Genre.countDocuments().exec(),
  ]);

  res.render("index", {
    title: "music sharing app",
    artists_count: numArtists,
    genres_count: numGenres,
    songs_count: numSongs,
  });
});

// exports.songs_list = asyncHandler(async(req, res, next) => {
//     const allSongs = await Song.find({}).sort({name: 1}).populate('Artist Genre').exec();
//     res.render('songs_list', )
// })
