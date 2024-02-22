const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

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
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const user = new User({
        username: req.body.username,
        hashedpassword: hash,
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
      User.findOne({ username: req.body.username }).then((user) => {
        if (!user) {
          return res.render("signup-form", {
            errors: [{ msg: "Invalid username" }],
          });
        }
        bcrypt.compare(
          req.body.password,
          user.hashedpassword,
          (err, result) => {
            if (result) {
              // HttpOnly means that the frontend cannot access the cookies using JS, document.cookie
              res.setHeader(
                "Set-Cookie",
                "isLoggedIn=true; path=/; Expires=Wed, 21 Oct 2025 07:28:00 GMT; HttpOnly"
              );
              return res.redirect("/");
            }
            res.render("login-form", {
              errors: [{ msg: "Invalid Password!" }],
            });
          }
        );
      });
    }
  }),
];
