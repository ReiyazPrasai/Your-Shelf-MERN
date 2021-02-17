const Joi = require("@hapi/joi");

const categoryValidation = (body) => {
    let subCategory = Joi.object().keys({
        name: Joi.string().max(50).min(4).required(),
        isActive: Joi.boolean().required(),
    })
  const schema = Joi.object({
    name: Joi.string().max(50).min(4).required(),
    isActive: Joi.boolean().required(),
    subCategories: Joi.array().items(subCategory)
  });
  return schema.validate(body);
};

const subCategoryValidation = (body) => {
const schema = Joi.object({
  name: Joi.string().max(50).min(4).required(),
  isActive: Joi.boolean().required(),
  categoryId: Joi.string().required()
});
return schema.validate(body);
};


module.exports.categoryValidation = categoryValidation;
module.exports.subCategoryValidation = subCategoryValidation;

