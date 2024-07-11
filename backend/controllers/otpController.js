const Otp = require("../models/Otp");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const transporter = require("../config/nodemailer");
const TempAdmin = require("../models/TempAdmin");

const generateOtp = () => {
  return crypto.randomBytes(3).toString("hex");
};

const sendOtp = async ({ email, otp }) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "OTP Verification",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    throw new Error("Failed to send OTP");
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const tempAdmin = await TempAdmin.findOne({ email, otp });
    if (!tempAdmin) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const { name, password, contactNo } = tempAdmin;
    const newAdmin = new Admin({
      name,
      email,
      password,
      contactNo,
      isVerified: true,
    });
    const savedAdmin = await newAdmin.save();

    await TempAdmin.deleteOne({ email });

    const token = jwt.sign({ id: savedAdmin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token, newAdmin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { generateOtp, sendOtp, verifyOtp };
