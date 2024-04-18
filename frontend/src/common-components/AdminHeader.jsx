import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import axios from "axios";

const AdminHeader = () => {
  // Function to handle logout
  const handleLogOut = async () => {
    try {
      await axios.get(
        `${import.meta.env.VITE_BACKEND_ENDPOINT_URL}/user/clearCookies`,
        { withCredentials: true }
      );
      // Remove user details from localStorage
      localStorage.removeItem("userDetails");
      // Reload the window after logout
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="admin-header">
        <Container fluid>
          <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-flex d-lg-none">
              <Nav.Link href="/admin">Home</Nav.Link>
              <Nav.Link href="/addproducts">Create</Nav.Link>
              <Nav.Link href="/allorders">All Orders</Nav.Link>
              <Nav.Link onClick={handleLogOut}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminHeader;
