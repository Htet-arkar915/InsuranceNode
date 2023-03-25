const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer")) {
    console.log(`this is no auth${authHeader}`);
    return res.status(401);
  }
  //console.log(authHeader);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(403);
    }
    req.user = decoded.UserInfo.username;
    console.log(req.user);
    req.roles = decoded.UserInfo.roles;
    next();
  });
};
module.exports = verifyJWT;
