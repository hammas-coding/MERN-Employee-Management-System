const Employee = require("../models/Employee");

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createEmployee = async (req, res) => {
  const { name, email, position, salary, contactNo } = req.body;

  try {
    const existingEmployee = await Employee.findOne({
      $or: [{ email }, { contactNo }],
    });
    if (existingEmployee) {
      return res
        .status(400)
        .json({ message: "Email or contact number already exists" });
    }

    const newEmployee = new Employee({
      name,
      email,
      position,
      salary,
      contactNo,
    });
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, position, salary, contactNo } = req.body;

  try {
    const existingEmployee = await Employee.findOne({
      $or: [{ email }, { contactNo }],
      _id: { $ne: id },
    });
    if (existingEmployee) {
      return res
        .status(400)
        .json({ message: "Email or contact number already exists" });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { name, email, position, salary, contactNo },
      { new: true }
    );
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    await Employee.findByIdAndDelete(id);
    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getEmployeeById = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
};
