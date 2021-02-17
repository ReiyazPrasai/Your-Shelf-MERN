const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 4,
  },
  isActive: {
    type: Boolean,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  contactNumber: {
    type: String,
    required: true,
    min: 10,
    max: 10,
  },
  address: {
    type: String,
    required: true,
    min: 4,
  },
  city: {
    type: String,
    required: true,
    min: 4,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Store", storeSchema);
