const MongoDBStore = require("connect-mongo");
const MONGODB_URL = require("./config").MONGODB_URL;

const sessionsConfig = {
  name: "sid",
  resave: false,
  saveUninitialized: false,
  secret: "a7a",
  store: MongoDBStore.create({
    mongoUrl: MONGODB_URL,
    collectionName: "sessions",
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
    sameSite: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
  },
};

module.exports = sessionsConfig;
