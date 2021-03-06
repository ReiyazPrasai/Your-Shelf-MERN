const router = require("express").Router();

const verifyToken = require("../middleware/verifyToken");
const handleQuery = require("../middleware/handleQuery");
const {
  loginCallback,
  registerCallback,
  confirmationCallback,
  logoutCallback,
  userInfoCallback,
  forgotPasswordCallback,
  resetPasswordCallback,
  resetPasswordRedirectCallback,
  getUserCallback,
} = require("../controller/authController");
const { companyRegisterCallback } = require("../controller/companyController");

router.get("/", verifyToken, handleQuery, getUserCallback);
router.post(
  "/register",
  companyRegisterCallback,
  verifyToken,
  registerCallback
);
router.post("/login", loginCallback);
router.get("/logout", verifyToken, logoutCallback);
router.get("/info", userInfoCallback);
router.get("/confirmation/:token", confirmationCallback);
router.post("/forgot-password", forgotPasswordCallback);
router.get("/reset-password/:token", resetPasswordRedirectCallback);
router.put("/reset-password", resetPasswordCallback);

module.exports = router;
