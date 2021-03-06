const Joi = require("@hapi/joi");

let basicValues = Joi.object().keys({
  name: Joi.string().max(50).min(4).required(),
  registrationNumber: Joi.string().max(25).required(),
  contactNumber: Joi.string().length(10).required(),
  city: Joi.string().max(50).min(4).required(),
  address: Joi.string().max(250).min(4).required(),
  ownerCount: Joi.number().required(),
});
let discountValues = Joi.object().keys({
  discountPercent: Joi.number().max(100).min(0).required(),
  validFrom: Joi.date().required(),
  validTo: Joi.date().required(),
});
let financeValues = Joi.object().keys({
  discount: discountValues,
  appCommission: Joi.number(),
  vat: Joi.number().required(),
  allowedProfitMargin: Joi.number() || null,
  message: Joi.string().max(200),
});

const companyValidation = (body) => {
  const schema = Joi.object({
    basic: basicValues.required(),
    finance: financeValues,
  });

  return schema.validate(body);
};

module.exports.companyValidation = companyValidation;
module.exports.companyValues = Joi.object().keys({
  basic: basicValues.required(),
  finance: financeValues,
});
