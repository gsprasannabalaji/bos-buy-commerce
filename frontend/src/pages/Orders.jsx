import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, ListGroup, Button, Row, Col, Image } from 'react-bootstrap';
import laptopcategory from "../assets/laptop_category.webp";
import desktopcategory from "../assets/desktop_category.webp";
import gamingcategory from "../assets/gaming_category.webp";

const ProductItem = ({ product }) => {
  return (
    <Row className="mb-3">
      <Col md={2}>
        <Image src={product.image} fluid />
      </Col>
      <Col md={10}>
      <div><strong>{product.name}</strong></div> 
        <div>Qty : {product.quantity}</div>
        <div>Price : ${product.price}</div>
      </Col>
    </Row>
  );
};

const OrderItem = ({ order }) => {
    return (
      <Card className="mb-4 shadow-sm">
        <Card.Header className="bg-white">
          <Row className="align-items-center">
            <Col><strong>Date:</strong> {order.date}</Col>
            <Col><strong>Order#:</strong> {order.orderNumber}</Col>
            <Col className="text-right"><strong>Total:</strong> ${order.total}</Col>
          </Row>
        </Card.Header>
        <ListGroup className="list-group-flush">
          {order.products.map((product, index) => (
            <ListGroup.Item key={index}>
              <ProductItem product={product} />
            </ListGroup.Item>
          ))}
          <ListGroup.Item>
            <Row>
              <Col md={{ span: 10, offset: 2 }}>
                <div>Delivered on {order.deliveryDate}</div>
                <div>Sold by {order.seller} | Fulfilled by {order.fulfillment}</div>
                
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    );
  };

const OrdersList = ({ orders }) => {
  return (
    <div>
      {orders.map((order, index) => (
        <OrderItem key={index} order={order} />
      ))}
    </div>
  );
};

const exampleOrders = [
  {
    date: 'Feb 01, 2024',
    orderNumber: '200011748489840',
    total: '127.39',
    deliveryDate: 'Feb 04',
    seller: 'BOSbuy USA LTD',
    fulfillment: 'BOSbuy',
    products: [
      {
        name: 'HP Envy x360, Enhanced by AI, Intel Core Ultra 5 125U, 14-inch (35.6 cm), WUXGA, 16GB LPDDR5, 512GB SSD, Intel Graphics, 5MP IR Camera, Poly Studio (Win 11, MSO 2021, Silver, 1.44 kg), fc0105TU',
        description: 'Let HP Smart Sense AI handle your device’s power consumption and updates. Meanwhile, assistants like Copilot and Otter.ai can manage all your tasks and optimize performance.',
        quantity: 2,
        image: laptopcategory,
        price:599, 
      }
    ],
    onStartReturn: (orderNumber) => console.log('Starting return for order:', orderNumber),
    onViewDetails: (orderNumber) => console.log('Viewing details for order:', orderNumber)
  },
  {
    date: 'Mar 15, 2024',
    orderNumber: '200034567890123',
    total: '299.99',
    deliveryDate: 'Mar 18',
    seller: 'BOSbuy USA LTD',
    fulfillment: 'BOSbuy',
    products: [
      {
        name: 'Lenovo IdeaPad Slim 3 Intel Core i3 12th Gen 15.6 inch (39.62cm) FHD Thin & Light Laptop',
        description: 'Processor: 12th Gen Intel Core i3-1215U | Speed: 6C (2P + 4E) / 8T, P-core 1.2 / 4.4GHz, E-core 0.9 / 3.3GHz, 10MB Cache',
        image: desktopcategory,
        quantity: 3, 
      },
      {
        name: 'Apple MacBook Air Laptop M1 chip, 13.3-inch/33.74 cm Retina Display, 8GB RAM, 256GB SSD Storage',
        description: 'All-Day Battery Life – Go longer than ever with up to 18 hours of battery life.',
        image: gamingcategory,
        quantity: 2, 
      }
    ],
    onStartReturn: (orderNumber) => console.log('Starting return for order:', orderNumber),
    onViewDetails: (orderNumber) => console.log('Viewing details for order:', orderNumber)
  }
];

const App = () => {
  return (
    <div className="container">
      <h1>My Orders</h1>
      <OrdersList orders={exampleOrders} />
    </div>
  );
};

export default App;
