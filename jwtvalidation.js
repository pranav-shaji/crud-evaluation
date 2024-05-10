let jwt = require("jsonwebtoken");
validate = (req, res, next) => {
  console.log(req.headers.authorization);
  if (req.headers.authorization) {
    let token = req.headers.authorization.split(" ")[1];
    try {
      const verifyToken = jwt.verify(token, "123");
      console.log(verifyToken);
      console.log("token verified");
      next();
    } catch (error) {
      res.send(error);
      console.log("ivalid token");
    }
  } else {
    res.send("token not found");
  }
};
module.exports = validate;
