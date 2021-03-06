const router = require("express").Router();

const verifyToken = require("../middleware/verifyToken");
const handleQuery = require("../middleware/handleQuery");
const {
  addCategoryCallback,
  addSubCategoryCallback,
  getCategoryCallback,
  getSubCategoryCallback,
  updateCategoryCallback,
  updateSubCategoryCallback,
  deleteByIdCategoryCallback,
  deleteByIdSubCategoryCallback,
} = require("../controller/categoryController");

router.get("/", verifyToken, handleQuery, getCategoryCallback);
router.post("/add", verifyToken, addCategoryCallback);
router.put("/edit/:id", verifyToken, updateCategoryCallback);
router.delete("/delete/:id", verifyToken, deleteByIdCategoryCallback);

// sub category routes

router.get(
  "/:categoryId/sub",
  verifyToken,
  handleQuery,
  getSubCategoryCallback
);
router.post("/sub/add", verifyToken, handleQuery, addSubCategoryCallback);
router.put(
  "/sub/edit/:id",
  verifyToken,
  handleQuery,
  updateSubCategoryCallback
);
router.delete("/sub/delete/:id", verifyToken, deleteByIdSubCategoryCallback);

module.exports = router;
