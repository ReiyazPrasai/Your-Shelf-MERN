const Joi = require("@hapi/joi");

const groupValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().max(50).min(4).required(),
    modules: Joi.array().items(String),
    isActive: Joi.boolean().required(),
  });
  return schema.validate(body);
};

module.exports.groupValidation = groupValidation;
