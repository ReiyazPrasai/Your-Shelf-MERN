const Joi = require("@hapi/joi");

const storeValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().max(50).min(4).required(),
    contactNumber: Joi.string().length(10).required(),
    city: Joi.string().max(50).min(4).required(),
    address: Joi.string().max(120).min(4).required(),
    isActive: Joi.boolean().required(),
  });
  return schema.validate(body);
};

module.exports.storeValidation = storeValidation;
