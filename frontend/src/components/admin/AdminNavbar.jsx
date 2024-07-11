import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
const AdminNavbarDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };
  const color = { backgroundColor: "#3e3e3e" };

  return (
    <Navbar expand="lg" style={color}>
      <Container style={color}>
        <LinkContainer to="/admin/add-employee" style={color}>
          <Navbar.Brand className={styles.logo}>Dashboard</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle
          aria-controls="navbarSupportedContent"
          className="border-0"
          style={color}
        >
          <FontAwesomeIcon
            icon={faBarsStaggered}
            color="#33d9b2"
            size="2x"
            style={{ backgroundColor: "#3e3e3e" }}
          />
        </Navbar.Toggle>
        <Navbar.Collapse
          id="navbarSupportedContent"
          className="m-1"
          style={color}
        >
          <Nav className="me-auto" style={color}>
            <LinkContainer
              to="/admin/add-employee"
              style={color}
              className={styles.linkMain}
            >
              <Nav.Link className={styles.link}>Add Employee</Nav.Link>
            </LinkContainer>
            <LinkContainer
              to="/admin/manage-employee"
              style={color}
              className={styles.linkMain}
            >
              <Nav.Link className={styles.link}>Manage Employee</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav className={styles.buttonMain}>
            <button onClick={handleLogout} className={styles.button}>
              Logout
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavbarDashboard;
