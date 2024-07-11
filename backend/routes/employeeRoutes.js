const express = require("express");
const {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById
} = require("../controllers/employeeController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/:id", auth, getEmployeeById); 
router.get("/", auth, getEmployees);
router.post("/", auth, createEmployee);
router.put("/:id", auth, updateEmployee);
router.delete("/:id", auth, deleteEmployee);

module.exports = router;
