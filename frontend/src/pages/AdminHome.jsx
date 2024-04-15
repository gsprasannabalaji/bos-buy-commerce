import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Nav, Modal, Form, Toast, ToastContainer } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToast } from "../features/toast/toastSlice";

function App() {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_ENDPOINT_URL}/product/getAll`);
            setProducts(data);
        } catch (error) {
            dispatch(setToast({
                toast: {
                    message: error.response?.data?.message || "Network Error",
                    variant: 'error'
                },
                showToast: true
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
            dispatch(setToast({
                toast: {
                    message: 'Product has been successfully deleted!',
                    variant: 'success'
                },
                showToast: true
            }));
            fetchProducts();
        } catch (error) {
            console.error("Failed to delete product:", error);
            dispatch(setToast({
                toast: {
                    message: 'Failed to delete product',
                    variant: 'error'
                },
                showToast: true
            }));
        }
        setShowDeleteModal(false);
        setProductIdToDelete(null);
    };

    const handleClose = () => setShowModal(false);
    const cancelDelete = () => setShowDeleteModal(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveChanges = async () => {
        if (!editProduct) return;
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_ENDPOINT_URL}/product/edit/${editProduct.productId}`, editProduct);
            if (response.status === 200) {
                fetchProducts();
                setShowModal(false);
            }
        } catch (error) {
            console.error("Failed to update product:", error);
            dispatch(setToast({
                toast: {
                    message: 'Failed to update product',
                    variant: 'error'
                },
                showToast: true
            }));
        }
    };

    const renderTableRows = products.map((product) => (
        <tr key={product._id}>
            <td>{product.productName}</td>
            <td>{product.productId}</td>
            <td>${product.price}</td>
            <td>{product.stock}</td>
            <td>{product.description}</td>
            <td>
                <Button variant="warning" onClick={() => handleEdit(product)} className="w-100 mb-2">
                    Edit
                </Button>
                <Button variant="danger" onClick={() => handleDeleteProduct(product.productId)} className="w-100">
                    Delete
                </Button>
            </td>
        </tr>
    ));

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={12} className="px-md-4">
                        <h1>Product List</h1>
                        <Table striped bordered hover>
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
                            <Form.Control type="text" placeholder="Enter product name" name="productName" value={editProduct?.productName || ""} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="productPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" placeholder="Enter price" name="price" value={editProduct?.price || ""} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="productDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter description" name="description" value={editProduct?.description || ""} onChange={handleInputChange} />
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
}

export default App;
