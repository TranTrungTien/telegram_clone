const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../Utils/jwtSecret");

module.exports = (req, res, next) => {
  console.log("Verify Token");
  if (!req.headers.authorization) {
    return res.status(401).send("Access Denied");
  }
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    try {
      const hasPermission = jwt.verify(token, jwtSecretKey);
      req.user = hasPermission;
      console.log("req : ", req.user);
      return next();
    } catch (error) {
      console.log({ error });
      return res.status(401).send("Token expired");
    }
  } else {
    return res.status(401).send("Access Denied");
  }
};
