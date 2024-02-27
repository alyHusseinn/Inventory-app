const Song = require("../models/song");
const Artist = require("../models/artist");
const Genre = require("../models/genre");
const User = require("../models/user");
// instead of doing try catch on all functions we can put them in this fucntion
// asyncHandler -> it wraps the functions with try and catch
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const log = require("../utils/logger");

const multer = require("multer");
const { storage } = require("../storage/storage");
const upload = multer({ storage });

exports.index = asyncHandler(async (req, res, next) => {
  const [songs, artists, genres] = await Promise.all([
    Song.find().exec(),
    Artist.find().exec(),
    Genre.find().exec(),,
  ]);

  res.render("index", {
    title: "music sharing app",
    artists: artists,
    genres: genres,
    songs: songs,
  });
});

exports.songs_list = asyncHandler(async (req, res, next) => {
  const songs = await Song.find({}).exec();

  res.render("songs_list", {
    title: "Songs",
    songs: songs,
  });
});

exports.song_details = asyncHandler(async (req, res, next) => {
  const song = await Song.findById(req.params.id)
    .populate("artist genre created_by")
    .exec();

  if (song == null) {
    const err = new Error("Song not found");
    err.status = 404;
    next(err);
  }

  res.render("song_details", {
    title: "Song details",
    song: song,
  });
});

exports.song_create_get = asyncHandler(async (req, res, next) => {
  const [artists, genres] = await Promise.all([
    Artist.find().exec(),
    Genre.find().exec(),
  ]);
  res.render("song_form", {
    title: "Add a new Song",
    artists: artists,
    genres: genres,
  });
});

exports.song_create_post = [
  upload.single("cover"),
  body("name")
    .trim()
    .escape()
    .isLength({ min: 5 })
    .withMessage("Please enter a Name size bigger than 5 characters"),
  body("summary")
    .trim()
    .escape()
    .isLength({ min: 20 })
    .withMessage("Please enter a Summary size bigger than 20 characters"),
  body("link")
    .trim()
    .custom((v) =>
      /(https?:\/\/(?:www\.)?)?(open\.spotify|soundcloud)\.com\/.*$/.test(v)
    )
    .withMessage("It Should be a Spotify or soundCloud Link!"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const [artists, genres] = await Promise.all([
      Artist.find().exec(),
      Genre.find().exec(),
    ]);

    const song = new Song({
      name: req.body.name,
      cover: req.file.path,
      link: req.body.link,
      summary: req.body.summary,
      artist: req.body.artist,
      genre: req.body.genre,
      created_by: req.user._id,
    });

    if (!errors.isEmpty()) {   
      res.render("song_form", {
        title: "Add a new Song",
        song: song,
        artists: artists,
        genres: genres,
        errors: errors.array(),
      });
    } else {
      await song.save();
      res.redirect(song.url);
    }
  }),
];

exports.song_update_get = asyncHandler(async (req, res, next) => {
  const [artists, genres, song] = await Promise.all([
    Artist.find().exec(),
    Genre.find().exec(),
    Song.findById(req.params.id).populate("artist genre").exec(),
  ]);

  res.render("song_form", {
    title: "Update Song",
    artists: artists,
    genres: genres,
    song: song,
  });
});

exports.song_update_post = [
  upload.single("cover"),
  body("name")
    .trim()
    .escape()
    .isLength({ min: 5 })
    .withMessage("Please enter a Name size bigger than 5 characters"),
  body("summary")
    .trim()
    .escape()
    .isLength({ min: 20 })
    .withMessage("Please enter a Summary size bigger than 20 characters"),
  body("link")
    .trim()
    .custom((v) =>
      /(https?:\/\/(?:www\.)?)?(open\.spotify|soundcloud)\.com\/.*$/.test(v)
    )
    .withMessage("It Should be a Spotify or soundCloud Link!"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const [artists, genres] = await Promise.all([
      Artist.find().exec(),
      Genre.find().exec(),
    ]);

    const song = new Song({
      name: req.body.name,
      cover: req.file.path,
      link: req.body.link,
      summary: req.body.summary,
      artist: req.body.artist,
      genre: req.body.genre,
      created_by: req.user._id,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render("song_form", {
        title: "Add a new Song",
        song: song,
        artists: artists,
        genres: genres,
        errors: errors.array(),
      });
    } else {
      const updatedSong = await Song.findByIdAndUpdate(
        req.params.id,
        song,
        {}
      ).exec();
      res.redirect(updatedSong.url);
    }
  }),
];

exports.song_delete_get = asyncHandler(async (req, res, next) => {
  const song = await Song.findById(req.params.id).exec();

  if (!song) {
    const error = new Error("Song not found");
    error.status = 404;
    next(error);
  } else {
    res.render("song_delete", {
      title: `Delete Song: ${song.name}`,
    });
  }
});

exports.song_delete_post = asyncHandler(async (req, res, next) => {
  const song = await Song.findById(req.params.id).exec();
  if (!song) {
    const error = new Error("This song not found");
    error.status = 404;
    next(error);
  } else {
    await Song.findByIdAndDelete(req.params.id).exec();
    res.redirect("/catalog/songs");
  }
});
