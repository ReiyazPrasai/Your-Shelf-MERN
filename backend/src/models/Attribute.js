const mongoose = require("mongoose");

const attributeValuesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 4,
    },
    abbreviation: {
      type: String,
      required: true,
      max: 4,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  }
);

const categoryListSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      min: 4,
    },
  },
  { _id: false }
);

const attributeSchema = new mongoose.Schema({
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
  attributeValues: [attributeValuesSchema],
  categoryIdList: [categoryListSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  companyId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Attribute", attributeSchema);
