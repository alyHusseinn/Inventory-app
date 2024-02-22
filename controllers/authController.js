const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { request } = require("express");

exports.getSignup = (req, res, next) => {
  res.render("signup-form");
};

exports.postSignup = [
  body("username", "The Name should be minimoum 10 char")
    .trim()
    .isLength({ min: 10 }),
  body("password", "The Password should be minimoum 10 char")
    .trim()
    .isLength({ min: 10 }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("signup-form", { errors: errors.array() });
    } else {
      const user = new User({
        username: req.body.username,
        password: req.body.password,
      });

      await user.save();
      res.redirect("/auth/login");
    }
  }),
];

exports.getLogin = (req, res, next) => {
  res.render("login-form");
};

exports.postLogin = [
  body("username", "The Name should be minimoum 10 char")
    .trim()
    .isLength({ min: 10 }),
  body("password", "The Password should be minimoum 10 char")
    .trim()
    .isLength({ min: 10 }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("login-form", { errors: errors.array() });
    } else {
      const user = await User.findOne({
        username: req.body.username,
        password: req.body.password,
      });

      if(user) {
        // HttpOnly means that the frontend cannot access the cookies using JS, document.cookie
        res.setHeader('Set-Cookie','isLoggedIn=true; path=/; Expires=Wed, 21 Oct 2025 07:28:00 GMT; HttpOnly');
        res.redirect('/');
      }else {
        res.render("/auth/signup");
      }
    }
  }),
];
