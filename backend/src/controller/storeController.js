const Store = require("../models/Store");
const { onSuccess, onFailure } = require("../utils/responseDataStructure");
const { storeValidation } = require("../validation/storeValidation");

module.exports.addStoreCallback = async (req, res) => {
  const { error } = storeValidation(req.body);

  if (error)
    return res.status(400).send(onFailure(400, error.details[0].message));
  const isStore = await Store.findOne({ name: req.body.name });
  if (isStore)
    return res.status(400).send(onFailure(400, "Store already exists"));
  const store = new Store({
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    contactNumber: req.body.contactNumber,
    isActive: req.body.isActive,
  });
  const savedStore = await store.save();
  res.status(200).json(onSuccess(200, savedStore, "SuccessFully Added"));
};

module.exports.getStoreCallback = async (req, res) => {
  try {
    if (req.searchBy) {
      const store = await Store.find(req.searchBy)
        .sort(req.sortBy)
        .sort({ createdAt: -1 });
      res.status(200).json(onSuccess(200, store, "SuccessFully Fetched"));
    } else {
      const store = await Store.find().sort(req.sortBy).sort({ createdAt: -1 });
      res.status(200).json(onSuccess(200, store, "SuccessFully Fetched"));
    }
  } catch (err) {
    return res.status(400).send(onFailure(400, "Could not fetch store"));
  }
};

module.exports.getByIdStoreCallback = async (req, res) => {
  try {
    const store = await Store.findById(req.body._id);
    res.status(200).json(onSuccess(200, store, "SuccessFully Fetched"));
  } catch (err) {
    return res.status(400).send(onFailure(400, "Could not fetch store"));
  }
};

module.exports.updateStoreCallback = async (req, res) => {
  const { error } = storeValidation(req.body);

  if (error)
    return res.status(400).send(onFailure(400, error.details[0].message));

  const store = await Store.findById(req.params.id);
  for (const key in req.body) {
    if (Object.hasOwnProperty.call(req.body, key)) {
      store[key] = req.body[key];
    }
  }
  const savedStore = await store.save();
  res.status(200).json(onSuccess(200, savedStore, "SuccessFully Updated"));
};
