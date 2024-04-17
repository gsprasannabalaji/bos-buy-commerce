import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Nav,
  InputGroup,
} from "react-bootstrap";
import { setNewProduct } from "../features/products/productsSlice";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faTag,
  faDollarSign,
  faWarehouse,
  faSitemap,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

const AddProducts = () => {
  const newProductData = useSelector((state) => state?.products?.newProduct);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event?.target;
    if (name === "imageURL") {
      dispatch(
        setNewProduct({
          ...newProductData,
          [name]: event?.target?.files[0],
        })
      );
    } else {
      dispatch(
        setNewProduct({
          ...newProductData,
          [name]: value,
        })
      );
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
        formData.append("file", value, value.name);
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
        <Col md={2} className="d-none d-md-block bg-light sidebar vh-100">
          <Nav className="flex-column">
            <Nav.Item>
              <Nav.Link href="/admin">Dashboard</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/allorders">Orders</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/addproducts">Create</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={handleLogOut}>Logout</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col md={10}>
          <Container className="mt-5">
            <h1>
              <FontAwesomeIcon icon={faPlusCircle} />
              Add Product
            </h1>
            <Form onSubmit={handleSubmit}>
              <InputGroup className="mb-3" htmlFor="name">
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faTag} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  value={newProductData?.name || ""}
                  onChange={handleChange}
                  name="name"
                  id="name"
                />
              </InputGroup>

              <InputGroup className="mb-3" htmlFor="imageUpload">
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faUpload} />
                </InputGroup.Text>
                <Form.Control
                  id="imageUpload"
                  type="file"
                  onChange={handleChange}
                  name="imageURL"
                />
              </InputGroup>

              <InputGroup className="mb-3" htmlFor="description">
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faSitemap} />
                </InputGroup.Text>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter product description (Add as points)"
                  value={newProductData?.description || ""}
                  onChange={handleChange}
                  name="description"
                  id="description"
                />
              </InputGroup>

              <InputGroup className="mb-3" htmlFor="price">
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faDollarSign} />
                </InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  value={newProductData?.price || ""}
                  onChange={handleChange}
                  name="price"
                  id="price"
                />
              </InputGroup>

              <InputGroup className="mb-3" htmlFor="stock">
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faWarehouse} />
                </InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder="Enter stock"
                  value={newProductData?.stock || ""}
                  onChange={handleChange}
                  name="stock"
                  id="stock"
                />
              </InputGroup>

              <InputGroup className="mb-3" htmlFor="category">
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faSitemap} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Enter category"
                  value={newProductData?.category || ""}
                  onChange={handleChange}
                  name="category"
                  id="category"
                />
              </InputGroup>

              <Button variant="primary" type="submit">
                <FontAwesomeIcon icon={faPlusCircle} /> Add Product
              </Button>
            </Form>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProducts;
