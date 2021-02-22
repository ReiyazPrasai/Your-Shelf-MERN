const router = require("express").Router();

const verifyToken = require("../middleware/handleQuery");
const handleQuery = require("../middleware/handleQuery");
const {
  addGroupCallback,
  getGroupCallback,
  updateGroupCallback,
  deleteByIdGroupCallback
} = require("../controller/groupController");

router.get("/", verifyToken, handleQuery, getGroupCallback);
router.post("/add", verifyToken, addGroupCallback);
router.put("/edit/:id", verifyToken, updateGroupCallback);
router.delete("/delete/:id", verifyToken, deleteByIdGroupCallback);

module.exports = router;
