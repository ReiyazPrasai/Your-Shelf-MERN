const mongoose = require("mongoose");

const attributeSchema = new mongoose.Schema(
  {
    attribute: {
      type: String,
      required: true,
    },
    attributeValueList: [String],
  },
  { _id: false }
);

const descriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 50,
    },
    description: {
      type: String,
      required: true,
      max: 500,
      min: 6,
    },
    category: {
      type: String,
      required: true,
    },
    subCategories: {
      type: [String],
      required: true,
    },
    attributes: {
      type: [attributeSchema],
      required: true,
    },
    brand: {
      type: String,
      min: 3,
      max: 20,
    },
  },
  { _id: false }
);
const qAndPSchema = new mongoose.Schema(
  {
    quantity: {
      type: Number,
      reqired: true,
    },
    price: {
      type: Number,
      required: true,
    },
    attributeValueId: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const stocksDetailSchema = new mongoose.Schema(
  {
    attribute: {
      type: String,
      reqired: true,
    },
    qAndP: {
      type: [qAndPSchema],
      required: true,
    },
  },
  { _id: false }
);

const financeSchema = new mongoose.Schema(
  {
    vat: {
      type: Number,
      required: true,
    },
    allowedProfitMargin: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
    stocksDetail: {
      type: [stocksDetailSchema],
      required: true,
    },
  },
  { _id: false }
);

const productImageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    default: this._id,
  },
});

const productSchema = new mongoose.Schema({
  description: {
    type: descriptionSchema,
    required: true,
  },
  finance: {
    type: financeSchema,
    required: true,
  },
  image: productImageSchema,
  companyId: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
