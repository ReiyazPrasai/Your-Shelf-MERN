const Brand = require("../models/Brand");
const { onSuccess, onFailure } = require("../utils/responseDataStructure");
const { brandValidation } = require("../validation/brandValidation");

module.exports.addBrandCallback = async (req, res) => {
  const { error } = brandValidation(req.body);

  if (error)
    return res.status(400).send(onFailure(400, error.details[0].message));
  const isBrand = await Brand.findOne({ name: req.body.name });
  if (isBrand)
    return res.status(400).send(onFailure(400, "Brand already exists"));
  const brand = new Brand({
    name: req.body.name,
    isActive: req.body.isActive,
  });
  const savedBrand = await brand.save();
  res.status(200).json(onSuccess(200, savedBrand, "SuccessFully Added"));
};

module.exports.updateBrandCallback = async (req, res) => {
  const { error } = brandValidation(req.body);

  if (error)
    return res.status(400).send(onFailure(400, error.details[0].message));

  const brand = await Brand.findById(req.params.id);
  for (const key in req.body) {
    if (Object.hasOwnProperty.call(req.body, key)) {
      brand[key] = req.body[key];
    }
  }
  const savedBrand = await brand.save();
  res.status(200).json(onSuccess(200, savedBrand, "SuccessFully Updated"));
};

module.exports.getBrandCallback = async (req, res) => {
  try {
    if (req.searchBy) {
      const brand = await Brand.find(req.searchBy)
        .sort(req.sortBy)
        .sort({ createdAt: -1 });
      res.status(200).json(onSuccess(200, brand, "SuccessFully Fetched"));
    } else {
      const brand = await Brand.find().sort(req.sortBy).sort({ createdAt: -1 });
      res.status(200).json(onSuccess(200, brand, "SuccessFully Fetched"));
    }
  } catch (err) {
    return res.status(400).send(onFailure(400, "Could not fetch brand"));
  }
};

module.exports.getByIdBrandCallback = async (req, res) => {
  try {
    const brand = await Brand.findById(req.body._id);
    res.status(200).json(onSuccess(200, brand, "SuccessFully Fetched"));
  } catch (err) {
    return res.status(400).send(onFailure(400, "Could not fetch brand"));
  }
};
