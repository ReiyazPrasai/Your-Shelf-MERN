const Joi = require("@hapi/joi");

const roleValidation = (body) => {
  const schema = Joi.object({
    groupId: Joi.string().required(),
    roles: Joi.array().items(Joi.string()),
  });
  return schema.validate(body);
};

module.exports.roleValidation = roleValidation;
