const router = require("express").Router();

const verifyToken = require("../middleware/verifyToken");
const handleQuery = require("../middleware/handleQuery");
const { singleFileUpload } = require("../middleware/fileUpload");
const { upload } = require("../helper/uploadFileHelper");

const {
  addProductCallback,
  getProductCallback,
  updateProductCallback,
  deleteByIdProductCallback,
  getByIdProductCallback,
} = require("../controller/productController");

router.get("/", verifyToken, handleQuery, getProductCallback);
router.get("/:id", verifyToken, getByIdProductCallback);
router.post(
  "/add",
  verifyToken,
  upload.single("image"),
  singleFileUpload,
  addProductCallback
);
// router.put("/edit/:id", verifyToken, updateProductCallback);
// router.delete("/delete/:id", verifyToken, deleteByIdProductCallback);

module.exports = router;
