const TempAdmin = require("../models/TempAdmin");
const Admin = require("../models/Admin");
const otpController = require("./otpController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerAdmin = async (req, res) => {
  const { name, email, password, contactNo } = req.body;

  try {
    const existingAdmin = await Admin.findOne({
      $or: [{ email }, { contactNo }],
    });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Email or contact number already exists" });
    }

    const otp = otpController.generateOtp();
    await TempAdmin.create({ name, email, password, contactNo, otp });
    await otpController.sendOtp({ email, otp });
    res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin || !admin.isVerified) {
      return res
        .status(400)
        .json({ message: "Invalid credentials or admin not verified" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, admin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerAdmin, loginAdmin };
