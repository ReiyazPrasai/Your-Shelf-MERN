const Joi = require("@hapi/joi");

const attributeValidation = (body) => {
  let attributeValue = Joi.object().keys({
    name: Joi.string().max(50).min(4).required(),
    abbreviation: Joi.string().max(4).required(),
    isActive: Joi.boolean().required(),
    _id: Joi.string(),
  });
  let categoryIdList = Joi.object().keys({
    id: Joi.string().required(),
  });
  const schema = Joi.object({
    name: Joi.string().max(50).min(4).required(),
    isActive: Joi.boolean().required(),
    attributeValues: Joi.array().items(attributeValue).required(),
    categoryIdList: Joi.array().items(categoryIdList),
  });
  return schema.validate(body);
};

module.exports.attributeValidation = attributeValidation;
