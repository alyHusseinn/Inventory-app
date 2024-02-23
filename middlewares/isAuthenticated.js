const isAuth = (req, res, next) => {
  // if req has a isLoggedIn = true, then call next
  // else redirect to login page

  const isLoggedIn = req.get("Cookie")?.split(";")[1]?.split("=")[1];
  console.log(isLoggedIn);
  if(!req.session.loggedIn){
    res.redirect("/auth/login");
  }else {
    next();
  }
};

module.exports = isAuth;
