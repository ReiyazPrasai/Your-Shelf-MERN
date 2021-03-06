const jwt = require("jsonwebtoken");

const { onFailure } = require("../utils/responseDataStructure");

module.exports = (req, res, next) => {
  try {
    if (!req.company) {
      const token = req.cookies.Authorization;
      if (!token)
        return res.redirect(401, "https://yourshelf.netlify.app/#/auth/login");
      const isVerified = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = isVerified;
    }
    next();
  } catch (err) {
    res.redirect(401, "https://yourshelf.netlify.app/#/auth/login");
  }
};
