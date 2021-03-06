const router = require("express").Router();

const verifyToken = require("../middleware/verifyToken");
const handleQuery = require("../middleware/handleQuery");

const {
  addBrandCallback,
  getBrandCallback,
  updateBrandCallback,
  deleteByIdBrandCallback
} = require("../controller/brandController");

router.get("/", verifyToken, handleQuery, getBrandCallback);
router.post("/add", verifyToken, addBrandCallback);
router.put("/edit/:id", verifyToken, updateBrandCallback);
router.delete("/delete/:id", verifyToken, deleteByIdBrandCallback);

module.exports = router;
