const passport = require('passport');

const isAuth = (req, res, next) => {

  if(!req.isAuthenticated()){
    res.redirect("/auth/login");
  }else {
    next();
  }
};

module.exports = isAuth;
