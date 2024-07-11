import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form,  Container, Row, Col, Image } from "react-bootstrap";
import axios from "axios";
import Wallpaper from "../../assets/wallpaper.png";
import styles from "./Register.module.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/admin");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage("Invalid email or password.");
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
          <h2 className={styles.heading}>Admin Login</h2>
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
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <button className={styles.button} type="submit">
              Login
            </button>
          </Form>

          {message && <p className="mt-3 text-danger">{message}</p>}

          <div className={`mt-3 ${styles.label}`}>
            Don't have an account?{" "}
            <Link to="/" className={styles.loginText}>
              Register
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

export default AdminLogin;
