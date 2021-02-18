const Attribute = require("../models/Attribute");
const { onSuccess, onFailure } = require("../utils/responseDataStructure");
const { attributeValidation } = require("../validation/attributeValidation");

module.exports.addAttributeCallback = async (req, res) => {
  const { error } = attributeValidation(req.body);

  if (error)
    return res.status(400).send(onFailure(400, error.details[0].message));
  const isAttribute = await Attribute.findOne({ name: req.body.name });
  if (isAttribute)
    return res.status(400).send(onFailure(400, "Attribute already exists"));
  const attribute = new Attribute({
    name: req.body.name,
    isActive: req.body.isActive,
    attributeValues: req.body.attributeValues,
    categoryIdList: req.body.categoryIdList,
  });
  const saveAttribute = await attribute.save();
  res.status(200).json(onSuccess(200, saveAttribute, "SuccessFully Added"));
};

module.exports.getAttributeCallback = async (req, res) => {
  try {
    if (req.searchBy) {
      const attribute = await Attribute.find(req.searchBy)
        .sort(req.sortBy)
        .sort({ createdAt: -1 });
      res.status(200).json(onSuccess(200, attribute, "SuccessFully Fetched"));
    } else {
      const attribute = await Attribute.find()
        .sort(req.sortBy)
        .sort({ createdAt: -1 });
      res.status(200).json(onSuccess(200, attribute, "SuccessFully Fetched"));
    }
  } catch (err) {
    return res.status(400).send(onFailure(400, "Could not fetch attribute"));
  }
};

module.exports.getByIdAttributeCallback = async (req, res) => {
  try {
    const attribute = await Attribute.findById(req.body._id);
    res.status(200).json(onSuccess(200, attribute, "SuccessFully Fetched"));
  } catch (err) {
    return res.status(400).send(onFailure(400, "Could not fetch attribute"));
  }
};

module.exports.updateAttributeCallback = async (req, res) => {
  const { error } = attributeValidation(req.body);

  if (error)
    return res.status(400).send(onFailure(400, error.details[0].message));

  const attribute = await Attribute.findById(req.params.id);
  for (const key in req.body) {
    if (Object.hasOwnProperty.call(req.body, key)) {
      attribute[key] = req.body[key];
    }
  }
  const savedAttribute = await attribute.save();
  res.status(200).json(onSuccess(200, savedAttribute, "SuccessFully Updated"));
};

module.exports.deleteByIdAttributeCallback = async (req, res) => {
  try {
    const attribute = await Attribute.findByIdAndDelete(req.params.id);
    res.status(200).json(onSuccess(200, attribute, "SuccessFully Deleted"));
  } catch (err) {
    return res.status(400).send(onFailure(400, "Could not delete attribute"));
  }
}
