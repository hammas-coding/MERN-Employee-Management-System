import React, { useState } from "react";
import { Form,  Container, Row, Col, Image } from "react-bootstrap";
import axios from "axios";
import Wallpaper from "../../assets/wallpaper.png";
import styles from "./Register.module.css";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passwordPatternDescription, setPasswordPatternDescription] = useState(
    "Password should be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one numeric digit, and one special character."
  );
  const [message, setMessage] = useState(""); // Added state for message
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/register",
        {
          name,
          email,
          password,
          contactNo: phoneNumber,
        }
      );
      if (response.status === 200) {
        alert("Otp Sent to your mail!");
        setTimeout(() => {
          navigate("/otp", { state: { email } });
        }, 1500);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Error registering user. Please try again.");
      }
    }
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (!validatePassword(newPassword)) {
      setPasswordPatternDescription(
        "Password should be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one numeric digit, and one special character."
      );
    } else {
      setPasswordPatternDescription("");
    }
  };

  return (
    <Container fluid style={{ height: "100vh" }}>
      <Row className={`d-flex align-items-center`} style={{ height: "100%" }}>
        <Col
          md="6"
          className={`d-flex flex-column align-items-center justify-content-center `}
        >
          <h2 className={styles.heading}>Admin Register</h2>
          <Form onSubmit={handleRegister} style={{ width: "80%" }}>
            <Form.Group controlId="formBasicName" className={styles.formGroup}>
              <Form.Label className={styles.label}>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail" className={styles.formGroup}>
              <Form.Label className={styles.label}>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                title="Please enter a valid email address."
                required
              />
            </Form.Group>
            <Form.Group
              controlId="formBasicPhoneNumber"
              className={styles.formGroup}
            >
              <Form.Label className={styles.label}>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                maxLength={11}
                minLength={11}
                pattern="[0-9]*"
                required
              />
            </Form.Group>
            <Form.Group
              controlId="formBasicPassword"
              className={styles.formGroup}
            >
              <Form.Label className={styles.label}>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$"
                title="Password should be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one numeric digit, and one special character."
                required
              />
              {passwordPatternDescription && (
                <p className="mt-2 text-muted">{passwordPatternDescription}</p>
              )}
            </Form.Group>
            {message && <p className="mt-3 text-danger">{message}</p>}{" "}
            <button className={styles.button} type="submit">
              Register
            </button>
          </Form>
          <div className="mt-3">
            Already have an account?{" "}
            <Link to="/admin-login" className={styles.loginText}>
              Login
            </Link>
          </div>
        </Col>
        <Col md={6} className={`d-flex justify-content-center`}>
          <Image src={Wallpaper} className={styles.image} />
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
