var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const compression = require("compression");
require("./config/database");

var indexRouter = require("./routes/index");
const catalogRouter = require("./routes/catalog");
const authRouter = require("./routes/auth");

const sessionConfig = require("./config/sessions");
const session = require("express-session");
// Set up rate limiter: maximum of twenty requests per minute
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(compression());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(limiter);

app.use(session(sessionConfig));

const passport = require("passport");
require("./config/passportAuth");
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/catalog", catalogRouter);
app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

const errorHnadler = require("./middlewares/errorHandler");
app.use(errorHnadler);

module.exports = app;
