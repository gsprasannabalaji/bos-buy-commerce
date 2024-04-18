// OrderItem.js
import React from 'react';
import { Card, ListGroup, Row, Col } from 'react-bootstrap';
import ProductItem from './ProductItem'; // Import ProductItem component

const OrderItem = ({ order }) => {
  const totalPrice = order?.totalPrice;
  const date = new Date(order?.date).toLocaleDateString();

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header className="bg-grey">
        <Row className="align-items-center">
          <Col>
            <strong>Order Placed:</strong> {date}
          </Col>
          <Col>
            <strong>Order#:</strong> {order.orderId}
          </Col>
          <Col className="text-right">
            <strong>Total:</strong> ${totalPrice}
          </Col>
        </Row>
      </Card.Header>
      <ListGroup className="list-group-flush">
        {order?.products?.map((product, index) => (
          <ListGroup.Item key={index}>
            <ProductItem product={product} />
          </ListGroup.Item>
        ))}
        <ListGroup.Item>
          <Row>
            <Col md={{ span: 10, offset: 2 }}>
              <div>
                <strong>Delivery Address:</strong>
                {} {order.shippingAddress?.line1},{order?.shippingAddress?.line2},
                {order?.shippingAddress?.city},{orde?.shippingAddress?.state},
                {order?.shippingAddress?.postal_code}
              </div>
              <div>
                <strong>Fulfilled by BOSbuy</strong>
              </div>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default OrderItem;
