const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.checkAuth = false;
    return next();
  }

  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    req.checkAuth = false;
    return next();
  }
  try {
    decodeToken = jwt.verify(token, "somesupersecretkey");
  } catch (err) {
    req.checkAuth = false;
    return next();
  }
  if (!decodeToken) {
    req.isAuth = false;
    return next();
  }
  req.checkAuth = true;
  req.userId = decodeToken.userId;
  next();
};
