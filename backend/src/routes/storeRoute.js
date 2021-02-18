const router = require("express").Router();

const verifyToken = require("../middleware/verifyToken");
const handleQuery = require("../middleware/handleQuery");
const {
  addStoreCallback,
  getStoreCallback,
  updateStoreCallback,
  deleteByIdStoreCallback
} = require("../controller/storeController");

router.get("/", verifyToken, handleQuery, getStoreCallback);
router.post("/add", verifyToken, addStoreCallback);
router.put("/edit/:id", verifyToken, updateStoreCallback);
router.delete("/delete/:id", verifyToken, deleteByIdStoreCallback);


module.exports = router;
