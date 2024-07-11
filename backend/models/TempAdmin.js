const mongoose = require("mongoose");

const tempAdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactNo: { type: Number, required: true, unique: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, index: { expires: "5m" } }, // Automatically delete after 5 minutes
});

module.exports = mongoose.model("TempAdmin", tempAdminSchema);
