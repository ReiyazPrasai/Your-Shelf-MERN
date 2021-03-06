const { string } = require("@hapi/joi");
const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  modules: [String],
  isActive: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  companyId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Group", groupSchema);
