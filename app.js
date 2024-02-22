var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const { MONGODB_URL, PORT } = require("./utils/config");
const log = require("./utils/logger");
const compression = require("compression");

var indexRouter = require("./routes/index");
const catalogRouter = require("./routes/catalog");
const authRouter = require("./routes/auth");

const isAuth = require("./middlewares/isAuthenticated");
// Set up rate limiter: maximum of twenty requests per minute
// const RateLimit = require("express-rate-limit");
// const limiter = RateLimit({
//   windowMs: 1 * 60 * 1000, // 1 minute
//   max: 20,
// });

var app = express();

mongoose.set("strictQuery", false);
mongoose.connect(MONGODB_URL).then(() => {
  log.info("Connection to MongoDB is established Successfully!")
}).catch(err => {
  log.error(err);  
})

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(compression());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// app.use(limiter);

app.use("/", indexRouter);
app.use("/catalog", catalogRouter);
app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {}; 

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
