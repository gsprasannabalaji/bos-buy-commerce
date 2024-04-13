import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Navbar, Nav } from 'react-bootstrap';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await axios.get('http://localhost:3002/products');
    setProducts(data);
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/products/${id}`);
    fetchProducts(); // refresh the products list
  };

  const renderTableRows = products.map(product => (
    <tr key={product._id}>
      <td>{product.name}</td>
      <td>${product.price.toFixed(2)}</td>
      <td>{product.description}</td>
      <td>
        <Button variant="warning" onClick={() => handleEdit(product)}>Edit</Button>
        <Button variant="danger" onClick={() => deleteProduct(product._id)} style={{ marginLeft: 8 }}>Delete</Button>
      </td>
    </tr>
  ));

  const handleEdit = (product) => {
    // Logic to handle edit
    console.log('Editing product', product);
    // You might want to show a modal or another component to edit the product
  };

  return (
    <>

      <Container fluid>
        <Row>
          <Col md={3} lg={2} className="d-none d-md-block bg-light sidebar">
            <Nav className="col-md-12 d-none d-md-block bg-light sidebar" style={{height: "100vh"}}>
              <Nav.Item>
                <Nav.Link href="#dashboard">Dashboard</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#orders">Orders</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#products">Products</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#customers">Customers</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          <Col md={9} lg={10} className="ml-sm-auto px-md-4">
            <Container fluid>
              <h1>Product List</h1>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Product Id</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {renderTableRows}
                </tbody>
              </Table>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
