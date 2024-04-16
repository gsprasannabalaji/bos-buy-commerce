import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Form,
  FormControl,
  InputGroup,
  Nav
} from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToast } from "../features/toast/toastSlice";

const AdminHome = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_ENDPOINT_URL}/product/getAll`);
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      dispatch(setToast({
        message: error.response?.data?.message || "Network Error",
        variant: "error",
      }));
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowModal(true);
  };

  const handleDeleteProduct = (productId) => {
    setProductIdToDelete(productId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!productIdToDelete) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_ENDPOINT_URL}/product/delete/${productIdToDelete}`);
      fetchProducts(); 
      dispatch(setToast({
        message: "Product Deleted Successfully",
        variant: "success",
      }));
    } catch (error) {
      console.error("Failed to delete product:", error);
      dispatch(setToast({
        message: "Failed to delete product",
        variant: "error",
      }));
    }
    setShowDeleteModal(false);
    setProductIdToDelete(null);
  };

  const handleClose = () => setShowModal(false);
  const cancelDelete = () => setShowDeleteModal(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditProduct(prev => ({ ...prev, [name]: value }));
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

  const handleSaveChanges = async () => {
    if (!editProduct) return;
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_ENDPOINT_URL}/product/edit/${editProduct.productId}`, editProduct);
      fetchProducts();  
      setShowModal(false);
      dispatch(setToast({
        message: "Product Updated Successfully",
        variant: "success",
      }));
    } catch (error) {
      console.error("Failed to update product:", error);
      dispatch(setToast({
        message: "Failed to update product",
        variant: "error",
      }));
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredProducts = products.filter(product =>
    product.productName.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm)
  );

  const renderTableRows = filteredProducts.map((product) => (
    <tr key={product._id}>
      <td>{product.productName}</td>
      <td>{product.productId}</td>
      <td>${product.price.toFixed(2)}</td>
      <td>{product.stock}</td>
      <td>{product.description}</td>
      <td>
        <Button variant="warning" onClick={() => handleEdit(product)} className="mb-2 w-100">
          Edit
        </Button>
        <Button variant="danger" onClick={() => handleDeleteProduct(product.productId)}>
          Delete
        </Button>
      </td>
    </tr>
  ));

  return (
    <>
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
            <Row className="align-items-center py-3">
              <Col md={6}>
                <h1>Product List</h1>
              </Col>
              <Col md={6}>
                <InputGroup>
                  <FormControl
                    placeholder="Search products"
                    aria-label="Search products"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <InputGroup.Text><i className="fa fa-search"></i></InputGroup.Text>
                </InputGroup>
              </Col>
            </Row>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Product Id</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{renderTableRows}</tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="productName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                name="productName"
                value={editProduct?.productName || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="productPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                name="price"
                value={editProduct?.price || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="productDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                name="description"
                value={editProduct?.description || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminHome;
