const asyncHandler = require("express-async-handler");
const Artist = require("../models/artist");
const Song = require("../models/song");
const { body, validationResult } = require("express-validator");

const multer = require("multer");
const { storage } = require("../storage/storage");

const upload = multer({ storage: storage });

exports.artists_list = asyncHandler(async (req, res, next) => {
  const artists = await Artist.find({}).exec();
  res.render("artists_list", {
    title: "List of all artists",
    artists: artists,
  });
});

exports.artist_details = asyncHandler(async (req, res, next) => {
  const [artist, songs] = await Promise.all([
    Artist.findById(req.params.id).exec(),
    Song.find({ artist: req.params.id }).exec(),
  ]);

  res.render("artist_details", {
    title: artist.name,
    artist: artist,
    songs: songs,
  });
});

exports.artist_create_get = (req, res, next) => {
  res.render("artist_form", {
    title: "Add a new artist",
  });
};

exports.artist_create_post = [
  upload.single("avatar"),
  body("name")
    .escape()
    .trim()
    .isLength({ min: 5 })
    .withMessage("The name must be alphaptics characters"),
  body("link")
    .trim()
    .notEmpty()
    .custom((v) =>
      /(https?:\/\/(?:www\.)?)?(open\.spotify|soundcloud)\.com\/.*$/.test(v)
    )
    .withMessage("You should Provide Spotify or SoundCloud Link!"),
  body("date_of_birth").isISO8601().toDate(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    console.log(req.file);

    const artist = new Artist({
      name: req.body.name,
      link: req.body.link,
      date_of_birth: req.body.date_of_birth,
      avatar: req.file.path,
    });
    if (!errors.isEmpty()) {
      res.render("artist_form", {
        title: "Add  a new artist",
        artist: artist,
        errors: errors.array(),
      });
    } else {
      await artist.save();
      res.redirect(artist.url);
    }
  }),
];

exports.artist_update_get = asyncHandler(async (req, res, next) => {
  const artist = await Artist.findById(req.params.id).exec();
  if (!artist) {
    const err = new Error("Artist not found");
    err.status = 404;
    next(err);
  } else {
    res.render("artist_form", {
      title: "Update Artist",
      artist: artist,
    });
  }
});

exports.artist_update_post = [
  upload.single("avatar"),
  body("name")
    .escape()
    .trim()
    .isLength({ min: 5 })
    .withMessage("The name must be alphaptics characters"),
  body("link")
    .trim()
    .notEmpty()
    .custom((v) =>
      /(https?:\/\/(?:www\.)?)?(open\.spotify|soundcloud)\.com\/.*$/.test(v)
    )
    .withMessage("You should Provide Spotify or SoundCloud Link!"),
  body("date_of_birth").isISO8601().toDate(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const artist = new Artist({
      name: req.body.name,
      link: req.body.link,
      date_of_birth: req.body.date_of_birth,
      avatar: req.file.path,
      _id: req.params.id,
    });
    if (!errors.isEmpty()) {
      res.render("artist_form", {
        title: "Update an artist",
        artist: artist,
        errors: errors.array(),
      });
    } else {
      const updatedArtist = await Artist.findByIdAndUpdate(
        req.params.id,
        artist,
        {}
      ).exec();
      res.redirect(updatedArtist.url);
    }
  }),
];

exports.artist_delete_get = asyncHandler(async (req, res, next) => {
  const [artist, songs] = await Promise.all([
    Artist.findById(req.params.id).exec(),
    Song.find({ artist: req.params.id }).exec(),
  ]);

  if (artist == null) {
    res.redirect("/catalog/artists");
  }

  res.render("artist_delete", {
    title: "Delete An Artist",
    artist: artist,
    songs: songs,
  });
});

exports.artist_delete_post = asyncHandler(async (req, res, next) => {
  const [artist, songs] = await Promise.all([
    Artist.findById(req.params.id).exec(),
    Song.find({ artist: req.params.id }).exec(),
  ]);

  if (songs.length > 0) {
    res.render("artist_delete", {
      title: "Delete An Artist",
      artist: artist,
      songs: songs,
    });
  } else {
    await Artist.findByIdAndDelete(req.params.id).exec();
    res.redirect("/catalog/artists");
  }
});
