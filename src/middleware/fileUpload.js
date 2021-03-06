
const { onFailure } = require("../utils/responseDataStructure");

module.exports.singleFileUpload = async (req, res, next) => {
  try {
    req.file = {
      name: req.file.originalname,
      url: req.file.path,
    };
    next();
  } catch (err) {
    res
      .status(400)
      .send(onFailure(400, "File could not be saved. Please try again."));
  }
};
