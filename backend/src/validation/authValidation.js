const Joi = require("@hapi/joi");

const registerValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().max(50).min(6).required(),
    email: Joi.string().max(100).min(6).required().email(),
    password: Joi.string().max(100).min(8).required(),
    roleId: Joi.string(),
  });
  return schema.validate(body);
};

const loginValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().max(100).min(6).required().email(),
    password: Joi.string().max(100).min(8).required(),
  });
  return schema.validate(body);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
