import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import axios from "axios";

function App() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_ENDPOINT_URL}/order/getAllOrders`);
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  const renderTableRows = () => {
    let rows = [];
    orders.forEach((order) => {
      order.products.forEach((product, index) => {
        rows.push(
          <tr key={`${order._id}-${product.productId}`}>
            {index === 0 ? (
              <td rowSpan={order.products.length}>{order.orderId}</td>
            ) : null}
            <td>{product.productName}</td>
            {index === 0 ? (
              <td rowSpan={order.products.length}>{order.email}</td>
            ) : null}
            {index === 0 ? (
              <td rowSpan={order.products.length}>
                {`${order.shippingAddress.line1}, ${order.shippingAddress.line2 || ''} ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.postal_code}, ${order.shippingAddress.country}`}
              </td>
            ) : null}
          </tr>
        );
      });
    });
    return rows;
  };

  return (
    <>
      <Container fluid className="p-3">
        <Row>
          <Col lg={12}>
            <h1 className="mb-4">Order List</h1>
            <Table responsive="sm" striped bordered hover className="table-custom">
              <thead className="table-header">
                <tr>
                  <th>Order ID</th>
                  <th>Product Name</th>
                  <th>Email</th>
                  <th>Shipping Address</th>
                </tr>
              </thead>
              <tbody>{renderTableRows()}</tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
