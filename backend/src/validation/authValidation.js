const { string } = require("@hapi/joi");
const Joi = require("@hapi/joi");
const { companyValues } = require("./companyValidation");

const registerValidation = (body) => {
  const userValues = Joi.object().keys({
    name: Joi.string().max(50).min(6).required(),
    email: Joi.string().max(100).min(6).required().email(),
    password: Joi.string().max(100).min(8).required(),
    groupName: Joi.string().max(50).min(4).required(),
    roles: Joi.array().items(Joi.string()),
    groupId: Joi.string(),
    roleId: Joi.string(),
    isActive: Joi.boolean(),
  });

  const schema = Joi.object(
    body.company
      ? {
          user: userValues.required(),
          company: companyValues,
        }
      : {
          user: userValues.required(),
        }
  );
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
