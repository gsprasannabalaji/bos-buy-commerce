import React from "react";
import { Container } from "react-bootstrap";
import AdminHeader from "./AdminHeader";
import Footer from "./Footer";

const AdminLayout = ({ children }) => {
  return (
    <>
      <AdminHeader />
      <Container fluid>{children}</Container>
      <Footer />
    </>
  );
};

export default AdminLayout;
