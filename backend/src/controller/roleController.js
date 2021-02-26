const Role = require("../models/Role");
const { onSuccess, onFailure } = require("../utils/responseDataStructure");
const { roleValidation } = require("../validation/roleValidation");

module.exports.addRoleCallback = async (req, res) => {
  const { error } = roleValidation(req.body);

  if (error)
    return res.status(400).send(onFailure(400, error.details[0].message));
  const isRole = await Role.findOne({ name: req.body.name });
  if (isRole)
    return res.status(400).send(onFailure(400, "Role already exists"));
  const role = new Role({
    groupId: req.body.groupId,
    roles: req.body.roles,
    companyId: req.user.companyId
  });
  const savedRole = await role.save();
  res.status(200).json(onSuccess(200, savedRole, "SuccessFully Added"));
};

module.exports.updateRoleCallback = async (req, res) => {
  const { error } = roleValidation(req.body);

  if (error)
    return res.status(400).send(onFailure(400, error.details[0].message));

  const role = await Role.findById(req.params.id);
  for (const key in req.body) {
    if (Object.hasOwnProperty.call(req.body, key)) {
      role[key] = req.body[key];
    }
  }
  const savedRole = await role.save();
  res.status(200).json(onSuccess(200, savedRole, "SuccessFully Updated"));
};

module.exports.getRoleCallback = async (req, res) => {
  try {
    if (req.searchBy) {
      const role = await Role.find(req.searchBy)
        .sort(req.sortBy)
        .sort({ createdAt: -1 });
      res.status(200).json(onSuccess(200, role, "SuccessFully Fetched"));
    } else {
      const role = await Role.find().sort(req.sortBy).sort({ createdAt: -1 });
      res.status(200).json(onSuccess(200, role, "SuccessFully Fetched"));
    }
  } catch (err) {
    return res.status(400).send(onFailure(400, "Could not fetch role"));
  }
};

module.exports.getByIdRoleCallback = async (req, res) => {
  try {
    const role = await Role.findById(req.body._id);
    res.status(200).json(onSuccess(200, role, "SuccessFully Fetched"));
  } catch (err) {
    return res.status(400).send(onFailure(400, "Could not fetch role"));
  }
};

module.exports.deleteByIdRoleCallback = async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    res.status(200).json(onSuccess(200, role, "SuccessFully Deleted"));
  } catch (err) {
    return res.status(400).send(onFailure(400, "Could not delete role"));
  }
};
