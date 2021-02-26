const router = require("express").Router();

const verifyToken = require("../middleware/verifyToken");
const handleQuery = require("../middleware/handleQuery");
const {
  addAttributeCallback,
  getAttributeCallback,
  updateAttributeCallback,
  deleteByIdAttributeCallback,
} = require("../controller/attributeController");

router.get("/", verifyToken, handleQuery, getAttributeCallback);
router.post("/add", verifyToken, addAttributeCallback);
router.put("/edit/:id", verifyToken, updateAttributeCallback);
router.delete("/delete/:id", verifyToken, deleteByIdAttributeCallback);

module.exports = router;
