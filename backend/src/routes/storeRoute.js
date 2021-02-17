const router = require("express").Router();

const verifyToken = require("../middleware/verifyToken");
const handleQuery = require("../middleware/handleQuery");
const {
  addStoreCallback,
  getStoreCallback,
  updateStoreCallback,
} = require("../controller/storeController");

router.get("/", verifyToken, handleQuery, getStoreCallback);
router.post("/add", verifyToken, addStoreCallback);
router.put("/edit/:id", verifyToken, updateStoreCallback);

module.exports = router;
