import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Form, Button, Nav } from "react-bootstrap";
import { setNewProduct } from "../features/products/productsSlice";
import axios from "axios";

const AddProducts = () => {
  const newProductData = useSelector((state) => state?.products?.newProduct);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event?.target;
    if (name === "imageURL") {
      dispatch(setNewProduct({
        ...newProductData,
        [name]: event?.target?.files[0],
      }));
    } else {
      dispatch(setNewProduct({
        ...newProductData,
        [name]: value,
      }));
    }
  };

  const handleLogOut = async () => {
    try {
      await axios.get(
        `${import.meta.env.VITE_BACKEND_ENDPOINT_URL}/user/clearCookies`,
        { withCredentials: true }
      );
      localStorage.removeItem("userDetails");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    Object.entries(newProductData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(`${key}[]`, item));
      } else if (value instanceof File) {
        formData.append('file', value, value.name);
      } else {
        formData.append(key, value);
      }
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_ENDPOINT_URL}/product/create`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error Posting Data:", error.response.data);
    }
  };

  return (
    <Container fluid>
      <Row>
      <Col md={2} className="d-none d-md-block bg-light sidebar">
            <Nav className="flex-column">
              <Nav.Item><Nav.Link href="/admin">Dashboard</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link href="/allorders">Orders</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link href="/addproducts">Create</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link onClick={handleLogOut}>Logout</Nav.Link></Nav.Item>
            </Nav>
          </Col>
        <Col md={10}>
          <Container className="mt-5">
            <h1>Add Product</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  value={newProductData?.name || ""}
                  onChange={handleChange}
                  name="name"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="imageUpload">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleChange}
                  name="imageURL"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter product description"
                  value={newProductData?.description || ""}
                  onChange={handleChange}
                  name="description"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  value={newProductData?.price || ""}
                  onChange={handleChange}
                  name="price"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="stock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter stock"
                  value={newProductData?.stock || ""}
                  onChange={handleChange}
                  name="stock"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter category"
                  value={newProductData?.category || ""}
                  onChange={handleChange}
                  name="category"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Add Product
              </Button>
            </Form>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProducts;
