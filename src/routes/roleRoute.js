const router = require("express").Router();

const verifyToken = require("../middleware/verifyToken");
const handleQuery = require("../middleware/handleQuery");
const {
  addRoleCallback,
  getRoleCallback,
  updateRoleCallback,
  deleteByIdRoleCallback,
  getByIdRoleCallback
} = require("../controller/roleController");

router.get("/", verifyToken, handleQuery, getRoleCallback);
router.get("/:id", verifyToken, getByIdRoleCallback);
router.post("/add", verifyToken, addRoleCallback);
router.put("/edit/:id", verifyToken, updateRoleCallback);
router.delete("/delete/:id", verifyToken, deleteByIdRoleCallback);

module.exports = router;
