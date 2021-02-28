const mongoose = require("mongoose");

const basicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
  },
  registrationNumber: {
    type: String,
    required: true,
    max: 500,
    min: 10,
  },
  contactNumber: {
    type: String,
    required: true,
    max: 10,
    min: 10,
  },
  city: {
    type: String,
    required: true,
    max: 50,
    min: 10,
  },
  address: {
    type: String,
    required: true,
    max: 500,
    min: 10,
  },
  ownerCount: {
    type: Number,
  },
});

const discountSchema = new mongoose.Schema({
  discountPercent: {
    type: Number,
    default: 0,
  },
  validFrom: {
    type: Date,
  },
  validTo: {
    type: Date,
  },
});

const financeSchema = new mongoose.Schema({
  appCommission: {
    type: Number,
    default: 0.2,
  },
  vat: {
    type: Number,
    required: true,
  },
  allowedProfitMargin: {
    type: Number,
  },
  discount: {
    type: discountSchema,
  },
  message: {
    type: String,
    max: 200,
  },
});

const companySchema = new mongoose.Schema({
  basic: {
    type: basicSchema,
    reqired: true,
  },
  finance: {
    type: financeSchema,
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

module.exports = mongoose.model("Company", companySchema);
