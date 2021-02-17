const router = require("express").Router();

const verifyToken = require("../middleware/handleQuery")
const handleQuery = require("../middleware/handleQuery")
const {addAttributeCallback, getAttributeCallback, updateAttributeCallback} = require("../controller/attributeController")

router.get("/", verifyToken, handleQuery, getAttributeCallback);
router.post("/add", verifyToken, addAttributeCallback);
router.put("/edit/:id", verifyToken, updateAttributeCallback);


module.exports = router;