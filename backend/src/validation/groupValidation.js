const Joi = require("@hapi/joi");

const groupValidation = (body) => {
  let modules = Joi.object().keys({
    name: Joi.string().max(50).min(4).required(),
  });
  const schema = Joi.object({
    name: Joi.string().max(50).min(4).required(),
    modules: Joi.array().items(modules),
    isActive: Joi.boolean().required(),
  });
  return schema.validate(body);
};

module.exports.groupValidation = groupValidation;
