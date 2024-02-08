const asyncHandler = require("express-async-handler");
const Genre = require("../models/genre");

exports.genres_list = asyncHandler(async(req, res, next) => {
    res.send("aha neek");
});

exports.genre_details = asyncHandler(async(req, res, next) => {
    res.send("aha neek");
});

exports.genre_create_get = asyncHandler(async(req, res, next) => {
    res.send("aha neek");
});

exports.genre_create_post = asyncHandler(async(req, res, next) => {
    res.send("aha neek");
});

exports.genre_update_get = asyncHandler(async(req, res, next) => {
    res.send("aha neek");
});

exports.genre_update_post = asyncHandler(async(req, res, next) => {
    res.send("aha neek");
});

exports.genre_delete_get = asyncHandler(async(req, res, next) => {
    res.send("aha neek");
});

exports.genre_delete_post = asyncHandler(async(req, res, next) => {
    res.send("aha neek");
})