import React, { useEffect, useState } from "react";
import {  Container, Table, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/employees",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEmployees(response.data);
      } catch (err) {
        setError("Failed to fetch employees.");
      }
    };

    fetchEmployees();
  }, []);

  const handleDeleteEmployee = async (employeeId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/employees/${employeeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee._id !== employeeId)
      );
      setMessage("Employee deleted successfully.");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (err) {
      setError("Failed to delete employee.");
    }
  };

  const handleUpdateEmployee = (employeeId) => {
    navigate(`/admin/update-employee/${employeeId}`);
  };

  return (
    <Container>
      <h2 className={styles.manageText}>Manage Employees</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}
      <div className="table-responsive">
        <Table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Email</th>
              <th className={styles.th}>Position</th>
              <th className={styles.th}>Salary</th>
              <th className={styles.th}>Contact Number</th>
              <th className={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td className={styles.td}>{employee.name}</td>
                <td className={styles.td}>{employee.email}</td>
                <td className={styles.td}>{employee.position}</td>
                <td className={styles.td}>{employee.salary}</td>
                <td className={styles.td}>{employee.contactNo}</td>
                <td className={styles.buttonTd}>
                  <button
                    className={styles.button}
                    onClick={() => handleUpdateEmployee(employee._id)}
                  >
                    Update
                  </button>
                  <button
                    className={styles.button}
                    onClick={() => handleDeleteEmployee(employee._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default ManageEmployees;
