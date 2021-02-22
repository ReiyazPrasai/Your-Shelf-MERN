const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  groupId: {
    type: String,
    required: true,
  },
  roles: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Roles", userSchema);
