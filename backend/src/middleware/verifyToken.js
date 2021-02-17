const jwt = require("jsonwebtoken");

const { onFailure } = require("../utils/responseDataStructure");

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.Authorization;
    if (!token) return res.status(401).send(onFailure(401, "Access denied"));
    const isVerified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = isVerified;
    next();
  } catch (err) {
    res.status(400).send(onFailure(400, "Invalid Token"));
  }
};
