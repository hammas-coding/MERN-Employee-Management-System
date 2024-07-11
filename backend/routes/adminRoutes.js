const express = require("express");
const { registerAdmin, loginAdmin } = require("../controllers/adminController");
const { sendOtp, verifyOtp } = require("../controllers/otpController");

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

module.exports = router;
