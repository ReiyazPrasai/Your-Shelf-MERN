const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  groupId: {
    type: String,
    required: true,
  },
  roles: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  companyId: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model("Roles", roleSchema);
