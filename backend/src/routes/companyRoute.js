const router = require("express").Router();

const verifyToken = require("../middleware/verifyToken");
const handleQuery = require("../middleware/handleQuery");
const {
  getByIdCompanyCallback,
  updateCompanyCallback,
} = require("../controller/companyController");

router.get("/:id", verifyToken, getByIdCompanyCallback);
router.put("/edit/:id", verifyToken, updateCompanyCallback);

module.exports = router;
