const Joi = require("@hapi/joi");

const productValidation = (body) => {
  const attributeValues = Joi.object().keys({
    attribute: Joi.string().required(),
    attributeValueList: Joi.array().items(Joi.string()).required(),
  });

  const descriptionValues = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().min(6).max(500).required(),
    category: Joi.string().required(),
    subCategories: Joi.array().items(Joi.string()).required(),
    attributes: Joi.array().items(attributeValues).required(),
    brand: Joi.string().required(),
  });

  const qAndpVAlues = Joi.object().keys({
    quantity: Joi.number().required(),
    price: Joi.number().required(),
    attributeValueId: Joi.string().required(),
  });

  const stocksDetailValues = Joi.object().keys({
    attribute: Joi.string().required(),
    qAndP: Joi.array().items(qAndpVAlues).required(),
  });

  const financeValues = Joi.object().keys({
    allowedProfitMargin: Joi.number().min(0).max(100).required(),
    vat: Joi.number().min(0).max(100).required(),
    discount: Joi.number().min(0).max(100),
    stocksDetail: Joi.array().items(stocksDetailValues).required(),
  });

  const schema = Joi.object({
    description: descriptionValues.required(),
    finance: financeValues.required(),
    isActive: Joi.boolean().required(),
  });
  return schema.validate(body);
};

module.exports.productValidation = productValidation;
