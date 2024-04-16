import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const AdminHeader = () => {
  return (
    <>
      <style>
        {`
          @media (min-width: 993px) {
            /* Hides Nav when sidebar is visible */
            .admin-nav {
              display: none;
            }
          }

          @media (max-width: 992px) {
            /* Shows Nav when sidebar is hidden */
            .admin-nav {
              display: flex;
            }
          }
        `}
      </style>
      <Navbar bg="dark" variant="dark" expand="lg" className="admin-header">
        <Container fluid>
          <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto admin-nav">
              <Nav.Link href="/admin">Home</Nav.Link>
              <Nav.Link href="/addproducts">Create</Nav.Link>
              <Nav.Link href="/allorders">All Orders</Nav.Link>
              <Nav.Link href="/login">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminHeader;
