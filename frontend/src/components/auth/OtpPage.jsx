import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Container, Row, Col, Image } from "react-bootstrap";
import axios from "axios";
import Wallpaper from "../../assets/wallpaper.png";
import styles from "./Register.module.css";

const OtpPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/verify-otp",
        {
          email,
          otp,
        }
      );

      if (response.status === 201) {
        setMessage("Account Created");
        navigate("/admin-login");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage("OTP Doesn't Verify.");
      } else {
        setMessage("Error logging in. Please try again.");
      }
    }
  };

  return (
    <Container fluid style={{ height: "100vh" }}>
      <Row className={`d-flex align-items-center`} style={{ height: "100%" }}>
        <Col
          md="6"
          className={`d-flex flex-column align-items-center justify-content-center `}
        >
          <h2 className={styles.heading}>Verify Otp</h2>
          <Form onSubmit={handleLogin} style={{ width: "80%" }}>
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
                readOnly
              />
            </Form.Group>

            <Form.Group
              controlId="formBasicPassword"
              className={styles.formGroup}
            >
              <Form.Label className={styles.label}>OTP</Form.Label>
              <Form.Control
                type="text"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </Form.Group>

            <button type="submit" className={styles.button}>
              Verify
            </button>
          </Form>

          {message && <p className="mt-3">{message}</p>}
        </Col>
        <Col md={6} className={`d-flex justify-content-center`}>
          <Image src={Wallpaper} className={styles.image} />
        </Col>
      </Row>
    </Container>
  );
};

export default OtpPage;
