const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const passport = require("passport");

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

exports.postLogin = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
});

exports.postLogout = (req, res, next) => {
  // req.session.destroy((err) => {
  //   if (err) {
  //     console.error("Error:", err);
  //   }
  // });
  req.logout((err, info) => {
    if(err){
      next(err);
    }else {
      res.redirect("/auth/login");
    }
  })
};
