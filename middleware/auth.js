const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header("Authorization");
    if (!jwtToken) {
      return res.status(403).json("Not authorized!! Shut up!");
    }
    const payload = jwt.verify(jwtToken, process.env.jwtSecret);
    if (!payload) {
      return res.status(403).json("Not authorized!! Shut up!!!!");
    }
    req.user = payload.user;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(403).json("Not authorized!! Shut up!!!!!");
  }
};
