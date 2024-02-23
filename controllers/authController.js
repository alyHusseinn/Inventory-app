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
  body("username", "The Name should be at least 10 characters")
    .trim()
    .isLength({ min: 10 }),
  body("password", "The Password should be at least 10 characters")
    .trim()
    .isLength({ min: 10 }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("login-form", { errors: errors.array() });
    }

    try {
      const user = await User.findOne({ username: req.body.username });

      if (!user) {
        return res.render("signup-form", {
          errors: [{ msg: "Invalid username" }],
        });
      }

      const passwordMatch = await bcrypt.compare(
        req.body.password,
        user.hashedpassword
      );

      if (passwordMatch) {
        req.session.loggedIn = true;
        return res.redirect("/");
      } else {
        return res.render("login-form", {
          errors: [{ msg: "Invalid Password!" }],
        });
      }
    } catch (error) {
      // Handle any errors that might occur during database query or bcrypt comparison
      console.error("Error:", error);
      return res.status(500).send("Internal Server Error");
    }
  }),
];

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error:", err);
    }
  });
  res.redirect("/");
};
