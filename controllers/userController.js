const asyncHandler = require("express-async-handler");
const User = require("../models/user");

exports.users_list = asyncHandler(async(req, res, next) => {
    res.send("aha neek");
});

exports.user_details = asyncHandler(async(req, res, next) => {
    res.send("aha neek");
});

exports.user_create_get = asyncHandler(async(req, res, next) => {
    res.send("aha neek");
});

exports.user_create_post = asyncHandler(async(req, res, next) => {
    res.send("aha neek");
});

exports.user_update_get = asyncHandler(async(req, res, next) => {
    res.send("aha neek");
});

exports.user_update_post = asyncHandler(async(req, res, next) => {
    res.send("aha neek");
});

exports.user_delete_get = asyncHandler(async(req, res, next) => {
    res.send("aha neek");
});

exports.user_delete_post = asyncHandler(async(req, res, next) => {
    res.send("aha neek");
})