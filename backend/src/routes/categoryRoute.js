const router = require("express").Router();

const verifyToken = require("../middleware/verifyToken");
const handleQuery = require("../middleware/handleQuery");
const {
  addCategoryCallback,
  getCategoryCallback,
  getSubCategoryCallback,
  updateCategoryCallback,
  updateSubCategoryCallback,
  addSubCategoryCallback,
} = require("../controller/categoryController");

router.get("/", verifyToken, handleQuery, getCategoryCallback);
router.post("/add", verifyToken, addCategoryCallback);
router.put("/edit/:id", verifyToken, updateCategoryCallback);

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

module.exports = router;
