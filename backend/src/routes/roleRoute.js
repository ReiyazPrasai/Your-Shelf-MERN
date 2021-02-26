const router = require("express").Router();

const verifyToken = require("../middleware/verifyToken");
const handleQuery = require("../middleware/handleQuery");
const {
  addRoleCallback,
  getRoleCallback,
  updateRoleCallback,
  deleteByIdRoleCallback,
} = require("../controller/roleController");

router.get("/", verifyToken, handleQuery, getRoleCallback);
router.post("/add", verifyToken, addRoleCallback);
router.put("/edit/:id", verifyToken, updateRoleCallback);
router.delete("/delete/:id", verifyToken, deleteByIdRoleCallback);

module.exports = router;
