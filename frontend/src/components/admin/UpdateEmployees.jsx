import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Card,
} from "react-bootstrap";
import axios from "axios";
import styles from "./Profile.module.css";
const UpdateEmployees = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    position: "",
    salary: "",
    contactNo: "",
  });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const token = localStorage.getItem("token");

        const employeeResponse = await axios.get(
          `http://localhost:5000/api/employees/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEmployee(employeeResponse.data);
      } catch (err) {
        setError("Failed to fetch employee data.");
      }
    };

    fetchEmployeeData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await axios.put(`http://localhost:5000/api/employees/${id}`, employee, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("Employee updated successfully.");
      navigate("/admin/manage-employee");
    } catch (err) {
      setError("Failed to update employee.");
    }
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col md={{ span: 6, offset: 3 }}>
          <Card className={styles.cardMain}>
            <Card.Body className={styles.cardMainInner}>
              <h1 className={styles.mainText}>Update Employee</h1>
              <hr className={styles.hr} />
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
              <Form onSubmit={handleSubmit} className={styles.formMain}>
                <Form.Group controlId="name" className={styles.formGroup}>
                  <Form.Label className={styles.label}>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={employee.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="email" className={styles.formGroup}>
                  <Form.Label className={styles.label}>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={employee.email}
                    readOnly
                    required
                  />
                </Form.Group>
                <Form.Group controlId="position" className={styles.formGroup}>
                  <Form.Label className={styles.label}>Position</Form.Label>
                  <Form.Control
                    type="text"
                    name="position"
                    value={employee.position}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="salary" className={styles.formGroup}>
                  <Form.Label className={styles.label}>Salary</Form.Label>
                  <Form.Control
                    type="text"
                    name="salary"
                    value={employee.salary}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="contactNo" className={styles.formGroup}>
                  <Form.Label className={styles.label}>
                    Contact Number
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="contactNo"
                    value={employee.contactNo}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <button className={`${styles.button} mt-3`}>Update Employee</button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateEmployees;
