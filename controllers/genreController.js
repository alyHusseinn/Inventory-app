const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Genre = require("../models/genre");
const Song = require("../models/song");
const isAuthorized =
  require("../middlewares/isAuthorized").isAuthorized_to_update_genre;

exports.genres_list = asyncHandler(async (req, res, next) => {
  const genres = await Genre.find({}).exec();

  res.render("genres_list", {
    title: "All Genres List",
    genres: genres,
  });
});

exports.genre_details = asyncHandler(async (req, res, next) => {
  const [genre, songs] = await Promise.all([
    Genre.findById(req.params.id).populate("created_by").exec(),
    Song.find({ genre: req.params.id }).exec(),
  ]);

  res.render("genre_detail", {
    title: `Genre ${genre.name} Details`,
    genre: genre,
    songs: songs,
  });
});

exports.genre_create_get = asyncHandler(async (req, res, next) => {
  res.render("genre_form", {
    title: "Add new Genre",
  });
});

exports.genre_create_post = [
  body("name", "Genre must contain at least 5 characters")
    .trim()
    .escape()
    .isLength({ min: 5 }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const genre = new Genre({ name: req.body.name });

    if (!errors.isEmpty()) {
      res.render("genre_form", {
        title: "Create new Genre",
        genre: genre,
        errors: errors.array(),
      });
      return;
    }
    // find if genre is Exist
    const existedGenre = await Genre.findOne({ name: req.body.name }).exec();

    if (existedGenre) {
      res.redirect(existedGenre.url);
    } else {
      await genre.save();
      res.redirect(genre.url);
    }
  }),
];

exports.genre_update_get = [
  isAuthorized,
  asyncHandler(async (req, res, next) => {
    const genre = await Genre.findById(req.params.id).exec();

    if (!genre) {
      const err = new Error("No Genre found");
      err.status = 404;
      next(err);
    } else {
      res.render("genre_form", {
        title: `Update Genre: ${genre.name}`,
        genre: genre,
      });
    }
  }),
];

exports.genre_update_post = [
  isAuthorized,
  body("name", "Genre must contain at least 5 characters")
    .trim()
    .escape()
    .isLength({ min: 5 }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const genre = new Genre({ name: req.body.name, _id: req.params.id });

    if (!errors.isEmpty()) {
      res.render("genre_form", {
        title: "Create new Genre",
        genre: genre,
        errors: errors.array(),
      });
      return;
    }
    // find if genre is Exist
    const existedGenre = await Genre.findOne({ name: req.body.name }).exec();

    if (existedGenre) {
      res.redirect(existedGenre.url);
    } else {
      await Genre.findByIdAndUpdate(req.params.id, genre, {}).exec();
      res.redirect(genre.url);
    }
  }),
];

exports.genre_delete_get = [
  isAuthorized,
  asyncHandler(async (req, res, next) => {
    const genre = await Genre.findById(req.params.id).exec();
    if (!genre) {
      const err = new Error("Couldn't find this genre");
      err.status = 404;
      next(err);
    } else {
      res.render("genre_delete", {
        title: `Delete ${genre.name}: Genre`,
        genre: genre,
      });
    }
  }),
];

exports.genre_delete_post = [
  isAuthorized,
  asyncHandler(async (req, res, next) => {
    const [genre, songs] = await Promise.all([
      Genre.findById(req.params.id).exec(),
      Song.find({ genre: req.params.id }),
    ]);

    if (songs.length > 0) {
      res.render("genre_delete", {
        title: `Delete ${genre.name}: genre`,
        genre: genre,
        songs: songs,
      });
    } else {
      await Genre.findByIdAndDelete({ _id: req.params.id }).exec();
      res.redirect("/catalog/genres");
    }
  }),
];
