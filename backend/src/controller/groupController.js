const Group = require("../models/Group");
const { onSuccess, onFailure } = require("../utils/responseDataStructure");
const { groupValidation } = require("../validation/groupValidation");

module.exports.addGroupCallback = async (req, res) => {
  const { error } = groupValidation(req.body);

  if (error)
    return res.status(400).send(onFailure(400, error.details[0].message));
  const isGroup = await Group.findOne({ name: req.body.name });
  if (isGroup)
    return res.status(400).send(onFailure(400, "Group already exists"));

  const group = new Group({
    name: req.body.name,
    modules: req.body.modules,
    isActive: req.body.isActive,
    companyId: req.user.companyId
  });
  console.log(group)
  const savedGroup = await group.save();
  res.status(200).json(onSuccess(200, savedGroup, "SuccessFully Added"));
};

module.exports.updateGroupCallback = async (req, res) => {
  const { error } = groupValidation(req.body);

  if (error)
    return res.status(400).send(onFailure(400, error.details[0].message));

  const group = await Group.findById(req.params.id);
  for (const key in req.body) {
    if (Object.hasOwnProperty.call(req.body, key)) {
      group[key] = req.body[key];
    }
  }
  const savedGroup = await group.save();
  res.status(200).json(onSuccess(200, savedGroup, "SuccessFully Updated"));
};

module.exports.getGroupCallback = async (req, res) => {
  try {
    if (req.searchBy) {
      const group = await Group.find(req.searchBy)
        .sort(req.sortBy)
        .sort({ createdAt: -1 });
      res.status(200).json(onSuccess(200, group, "SuccessFully Fetched"));
    } else {
      const group = await Group.find().sort(req.sortBy).sort({ createdAt: -1 });
      res.status(200).json(onSuccess(200, group, "SuccessFully Fetched"));
    }
  } catch (err) {
    return res.status(400).send(onFailure(400, "Could not fetch group"));
  }
};

module.exports.getByIdGroupCallback = async (req, res) => {
  try {
    const group = await Group.findById(req.body._id);
    res.status(200).json(onSuccess(200, group, "SuccessFully Fetched"));
  } catch (err) {
    return res.status(400).send(onFailure(400, "Could not fetch group"));
  }
};

module.exports.deleteByIdGroupCallback = async (req, res) => {
  try {
    const group = await Group.findByIdAndDelete(req.params.id);
    res.status(200).json(onSuccess(200, group, "SuccessFully Deleted"));
  } catch (err) {
    return res.status(400).send(onFailure(400, "Could not delete group"));
  }
};
