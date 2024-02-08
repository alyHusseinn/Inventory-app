const asyncHandler = require('express-async-handler');
const Artist = require('../models/artist');

exports.artists_list = asyncHandler(async(req, res, next) => {
    res.send("aha neek");
})

exports.artist_details = asyncHandler(async(req, res, next) => {
    res.send("aha neek");
})

exports.artist_create_get = asyncHandler(async(req, res, next) => {
    res.send("aha neek");
})

exports.artist_create_post = asyncHandler(async(req, res, next) => {
    res.send("aha neek");
})

exports.artist_update_get = asyncHandler(async(req, res, next) => {
    res.send("aha neek");
})

exports.artist_update_post = asyncHandler(async(req, res, next) => {
    res.send("aha neek");
})

exports.artist_delete_get = asyncHandler(async(req, res, next) => {
    res.send("aha neek");
})

exports.artist_delete_post = asyncHandler(async(req, res, next) => {
    res.send("aha neek");
})