const Joi = require("@hapi/joi");

const brandValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().max(50).min(4).required(),
    isActive: Joi.boolean().required(),
  });
  return schema.validate(body);
};

module.exports.brandValidation = brandValidation;
