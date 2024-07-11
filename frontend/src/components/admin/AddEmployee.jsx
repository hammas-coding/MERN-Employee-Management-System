import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Alert,
  Card,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSuccess(null);
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "position":
        setPosition(value);
        break;
      case "salary":
        setSalary(value);
        break;
      case "contactNo":
        setContactNo(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/employees",
        { name, email, position, salary, contactNo },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSuccess("Employee added successfully!");
      setSuccess(null);
      navigate("/admin/manage-employee");
      setError(null);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message);
      } else {
        setError("Failed to add Employee. Please try again.");
      }
      setSuccess(null);
    }
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col md={{ span: 6, offset: 3 }}>
          <Card className={styles.cardMain}>
            <Card.Body className={styles.cardMainInner}>
              <h2 className={styles.mainText}>Add Employee</h2>
              <hr className={styles.hr} />
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <Form onSubmit={handleSubmit} className={styles.formMain}>
                <Form.Group controlId="name" className={styles.formGroup}>
                  <Form.Label className={styles.label}>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="email" className={styles.formGroup}>
                  <Form.Label className={styles.label}>
                    Email address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="position" className={styles.formGroup}>
                  <Form.Label className={styles.label}>Position</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter position"
                    name="position"
                    value={position}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="salary" className={styles.formGroup}>
                  <Form.Label className={styles.label}>Salary</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter salary"
                    name="salary"
                    value={salary}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="contactNo" className={styles.formGroup}>
                  <Form.Label className={styles.label}>
                    Contact Number
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter contact number"
                    name="contactNo"
                    value={contactNo}
                    onChange={handleChange}
                    required
                    pattern="[0-9]*"
                    maxLength={11}
                    minLength={11}
                  />
                </Form.Group>

                <button className={`${styles.button} mt-3`}>
                  Add Employee
                </button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddEmployee;
