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
import { setToast } from "../features/toast/toastSlice";
import {
  faTachometerAlt,
  faBoxOpen,
  faPlusSquare,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const AddProducts = () => {
  const newProductData = useSelector((state) => state?.products?.newProduct);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event?.target;
    if (name === "files") {
      dispatch(
        setNewProduct({
          ...newProductData,
          [name]: event?.target?.files,
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
        value.forEach((item) => {
          formData.append(`${key}[]`, item);
        });
      } else if (value instanceof FileList) {
        for (let i = 0; i < value.length; i++) {
          formData.append(`files`, value[i], value[i].name);
        }
      } else if (value instanceof File) {
        formData.append("file", value, value.name);
      } else {
        formData.append(key, value);
      }
    });

    const imageFiles = formData?.getAll("files");
    if (imageFiles?.length !== 4) {
      dispatch(
        setToast({
          toast: {
            message: "Minimum 4 images is required for the product",
            variant: "error",
          },
          showToast: true,
        })
      );
    } else {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_ENDPOINT_URL}/product/create`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        dispatch(
          setToast({
            toast: {
              message: "Product Created Successfully",
              variant: "success",
            },
            showToast: true,
          })
        );
        dispatch(setNewProduct(null));
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } catch (error) {
        console.error("Error Posting Data:", error.response.data);
        dispatch(
          setToast({
            toast: {
              message:
                error.response?.data?.message || "Product Creation Failed",
              variant: "error",
            },
            showToast: true,
          })
        );
      }
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={2} className="d-none vh-100 d-md-block bg-light sidebar">
          <Nav className="flex-column">
            <Nav.Item>
              <Nav.Link href="/admin" className="btn-link">
                <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
                Dashboard
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/allorders" className="btn-link">
                <FontAwesomeIcon icon={faBoxOpen} className="me-2" />
                Orders
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/addproducts" className="btn-link">
                <FontAwesomeIcon icon={faPlusSquare} className="me-2" />
                Create
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={handleLogOut} className="btn-link">
                <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                Logout
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col md={10}>
          <Container className="mt-5">
            <h1 className="mb-4">
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
                  label="Choose file"
                  type="file"
                  onChange={handleChange}
                  name="files"
                  multiple
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
                <Form.Select
                  type="select"
                  placeholder="Select category"
                  value={newProductData?.category || ""}
                  onChange={handleChange}
                  name="category"
                  id="category"
                >
                  <option value="">Select a Category</option>
                  <option value="laptops">Laptop</option>
                  <option value="desktops">Desktop</option>
                  <option value="gaming">Gaming Laptop</option>
                </Form.Select>
              </InputGroup>

              <Button variant="primary" type="submit">
                <FontAwesomeIcon icon={faPlusCircle} /> Create Product
              </Button>
            </Form>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProducts;
