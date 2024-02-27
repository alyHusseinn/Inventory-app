const passport = require('passport');

const isAuth = (req, res, next) => {

  if(!req.isAuthenticated()){
    res.redirect("/auth/login");
  }else {
    res.locals.currentUser = req.user;
    next();
  }
};

module.exports = isAuth;
