const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
  },
  email: {
    type: String,
    required: true,
    max: 500,
    min: 10,
  },
  password: {
    type: String,
    required: true,
    max: 100,
    min: 8,
  },
  groupId: {
    type: String,
  },
  groupName: {
    type: String,
  },
  companyId: {
    type: String,
    default: null,
  },
  roleId: {
    type: String,
  },
  roles: {
    type: [String],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isConfirmed: {
    type: Boolean,
    default: false,
  },
  resetFlag: {
    type: Number,
    default: Math.random(),
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
