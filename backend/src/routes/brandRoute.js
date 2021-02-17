const router = require("express").Router();

const verifyToken = require("../middleware/handleQuery");
const handleQuery = require("../middleware/handleQuery");
const {
  addBrandCallback,
  getBrandCallback,
  updateBrandCallback,
} = require("../controller/brandController");

router.get("/", verifyToken, handleQuery, getBrandCallback);
router.post("/add", verifyToken, addBrandCallback);
router.put("/edit/:id", verifyToken, updateBrandCallback);

module.exports = router;
