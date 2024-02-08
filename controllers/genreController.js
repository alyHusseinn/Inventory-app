const asyncHandler = require("express-async-handler");
const Genre = require("../models/genre");

exports.genres_list = asyncHandler(async(req, res, next) => {
    res.send("sdfsdfsdf");
});

exports.genre_details = asyncHandler(async(req, res, next) => {
    res.send("get Details");
});

exports.genre_create_get = asyncHandler(async(req, res, next) => {
    res.render("genre_form", {
        title: "Add new Genre",
    })
}); 

exports.genre_create_post = asyncHandler(async(req, res, next) => {
    res.send("ana meash tamam");
});

exports.genre_update_get = asyncHandler(async(req, res, next) => {
    res.send("update Genre Fomrm");
});

exports.genre_update_post = asyncHandler(async(req, res, next) => {
    res.send("update Genre Post");
});

exports.genre_delete_get = asyncHandler(async(req, res, next) => {
    res.send("asdlfjsldf");
});

exports.genre_delete_post = asyncHandler(async(req, res, next) => {
    res.send("mash3e");
})