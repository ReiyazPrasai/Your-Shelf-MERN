const Joi = require("@hapi/joi");

const roleValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    groupId: Joi.string().required(),
    roles: Joi.array().items(Joi.string()),
    isActive: Joi.boolean().required()
  });
  return schema.validate(body);
};

module.exports.roleValidation = roleValidation;
