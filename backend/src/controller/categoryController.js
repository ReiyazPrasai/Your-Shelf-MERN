const { Category, SubCategory } = require("../models/Category");
const Attribute = require("../models/Attribute");
const { onSuccess, onFailure } = require("../utils/responseDataStructure");
const {
  categoryValidation,
  subCategoryValidation,
} = require("../validation/categoryValidation");

module.exports.addCategoryCallback = async (req, res) => {
  const { error } = categoryValidation(req.body);

  if (error)
    return res.status(400).send(onFailure(400, error.details[0].message));
  const isCategory = await Category.findOne({ name: req.body.name });
  if (isCategory)
    return res.status(400).send(onFailure(400, "Category already exists"));

  const category = new Category({
    name: req.body.name,
    isActive: req.body.isActive,
    companyId: req.user.companyId
  });
  const saveCategory = await category.save();

  req.body.subCategories.forEach((subCategory) => {
    const saveSubCategory = new SubCategory({
      categoryId: saveCategory._id,
      name: subCategory.name,
      isActive: subCategory.isActive,
      companyId: req.user.companyId
    });
    saveSubCategory.save();
  });

  res.status(200).json(onSuccess(200, saveCategory, "SuccessFully Added"));
};

module.exports.getCategoryCallback = async (req, res) => {
  try {
    if (req.searchBy) {
      const category = await Category.find(req.searchBy)
        .sort(req.sortBy)
        .sort({ createdAt: -1 });
      res.status(200).json(onSuccess(200, category, "SuccessFully Fetched"));
    } else {
      const category = await Category.find()
        .sort(req.sortBy)
        .sort({ createdAt: -1 });
      res.status(200).json(onSuccess(200, category, "SuccessFully Fetched"));
    }
  } catch (err) {
    return res.status(400).send(onFailure(400, "Could not fetch category"));
  }
};

module.exports.updateCategoryCallback = async (req, res) => {
  const { error } = categoryValidation(req.body);

  if (error)
    return res.status(400).send(onFailure(400, error.details[0].message));

  const category = await Category.findById(req.params.id);
  if (!category)
    return res.status(404).send(onFailure(404, "Category does not exists"));
  for (const key in req.body) {
    if (Object.hasOwnProperty.call(req.body, key)) {
      category[key] = req.body[key];
    }
  }
  const saveCategory = await category.save();
  res.status(200).json(onSuccess(200, saveCategory, "SuccessFully Updated"));
};

module.exports.getByIdCategoryCallback = async (req, res) => {
  try {
    const category = await Category.findById(req.body._id);
    res.status(200).json(onSuccess(200, category, "SuccessFully Fetched"));
  } catch (err) {
    return res.status(400).send(onFailure(400, "Could not fetch category"));
  }
};

module.exports.deleteByIdCategoryCallback = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    SubCategory.deleteMany({ categoryId: req.params.id });
    const attribute = Attribute.find();
    (await attribute).forEach((item) => {
      const categoryList = item.categoryIdList.map(({ id }) => id);
      if (categoryList.includes(req.params.id)) {
        item.categoryIdList = item.categoryIdList.filter(
          ({ id }) => id !== req.params.id
        );
        console.log(attribute.categoryIdList);
        item.save();
      }
    });

    res.status(200).json(onSuccess(200, category, "SuccessFully Deleted"));
  } catch (err) {
    return res.status(400).send(onFailure(400, "Could not delete category"));
  }
};

// Sub Category Callbacks

module.exports.addSubCategoryCallback = async (req, res) => {
  const { error } = subCategoryValidation(req.body);

  if (error)
    return res.status(400).send(onFailure(400, error.details[0].message));

  const isSubCategory = await SubCategory.findOne({ name: req.body.name });
  if (isSubCategory)
    return res.status(400).send(onFailure(400, "Sub Category already exists"));

  const subCategory = new SubCategory({
    categoryId: req.body.categoryId,
    name: req.body.name,
    isActive: req.body.isActive,
  });
  const saveSubCategory = await subCategory.save();
  res.status(200).json(onSuccess(200, saveSubCategory, "SuccessFully Added"));
};

module.exports.updateSubCategoryCallback = async (req, res) => {
  const { error } = subCategoryValidation(req.body);

  if (error)
    return res.status(400).send(onFailure(400, error.details[0].message));

  const subCategory = await SubCategory.findById(req.params.id);
  for (const key in req.body) {
    if (Object.hasOwnProperty.call(req.body, key)) {
      subCategory[key] = req.body[key];
    }
  }
  const saveSubCategory = await subCategory.save();
  res.status(200).json(onSuccess(200, saveSubCategory, "SuccessFully Updated"));
};

module.exports.getSubCategoryCallback = async (req, res) => {
  try {
    if (req.searchBy) {
      const subCategory = await SubCategory.find({
        categoryId: req.params.categoryId,
        ...req.searchBy,
      })
        .sort(req.sortBy)
        .sort({ createdAt: -1 });
      res.status(200).json(onSuccess(200, subCategory, "SuccessFully Fetched"));
    } else {
      const subCategory = await SubCategory.find({
        categoryId: req.params.categoryId,
      })
        .sort(req.sortBy)
        .sort({ createdAt: -1 });
      res.status(200).json(onSuccess(200, subCategory, "SuccessFully Fetched"));
    }
  } catch (err) {
    return res.status(400).send(onFailure(400, "Could not fetch Sub Category"));
  }
};

module.exports.deleteByIdSubCategoryCallback = async (req, res) => {
  try {
    const subCategory = await SubCategory.findByIdAndDelete(req.params.id);

    res.status(200).json(onSuccess(200, subCategory, "SuccessFully Deleted"));
  } catch (err) {
    return res
      .status(400)
      .send(onFailure(400, "Could not delete sub category"));
  }
};
