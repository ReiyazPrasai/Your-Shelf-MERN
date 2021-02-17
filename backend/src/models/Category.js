const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const subCategorySchema = new mongoose.Schema({
  categoryId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    min: 4,
  },
  isActive: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports.Category = mongoose.model("Category", categorySchema);

module.exports.SubCategory = mongoose.model("SubCategory", subCategorySchema);
