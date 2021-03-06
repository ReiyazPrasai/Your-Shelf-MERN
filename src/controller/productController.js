const Product = require("../models/Product");
const { onSuccess, onFailure } = require("../utils/responseDataStructure");
const { productValidation } = require("../validation/productValidation");

module.exports.addProductCallback = async (req, res) => {
  const data = JSON.parse(req.body.data);
  const { error } = productValidation(data);

  if (error)
    return res.status(400).send(onFailure(400, error.details[0].message));

  const product = new Product({
    description: data.description,
    finance: data.finance,
    isActive: data.isActive,
    image: req.file,
    companyId: req.user.companyId,
  });
  const savedProduct = await product.save();
  res.status(200).json(onSuccess(200, savedProduct, "SuccessFully Added"));
};

module.exports.updateProductCallback = async (req, res) => {
  const { error } = productValidation(req.body);

  if (error)
    return res.status(400).send(onFailure(400, error.details[0].message));

  const product = await Product.findById(req.params.id);
  for (const key in req.body) {
    if (Object.hasOwnProperty.call(req.body, key)) {
      product[key] = req.body[key];
    }
  }
  const savedProduct = await product.save();
  res.status(200).json(onSuccess(200, savedProduct, "SuccessFully Updated"));
};

module.exports.getProductCallback = async (req, res) => {
  try {
    if (req.searchBy) {
      const product = await Product.find(req.searchBy)
        .sort(req.sortBy)
        .sort({ createdAt: -1 });
      res.status(200).json(onSuccess(200, product, "SuccessFully Fetched"));
    } else {
      const product = await Product.find()
        .sort(req.sortBy)
        .sort({ createdAt: -1 });
      res.status(200).json(onSuccess(200, product, "SuccessFully Fetched"));
    }
  } catch (err) {
    return res.status(400).send(onFailure(400, "Could not fetch product"));
  }
};

module.exports.getByIdProductCallback = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(onSuccess(200, product, "SuccessFully Fetched"));
  } catch (err) {
    return res.status(400).send(onFailure(400, "Could not fetch product"));
  }
};

module.exports.deleteByIdProductCallback = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(onSuccess(200, product, "SuccessFully Deleted"));
  } catch (err) {
    return res.status(400).send(onFailure(400, "Could not delete product"));
  }
};
