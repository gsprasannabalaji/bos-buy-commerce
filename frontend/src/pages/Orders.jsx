import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { Card, ListGroup, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  const price = product.price;
  const quantity = product.quantity;

  return (
    <Row className="mb-3">
      <Col md={2}>
        <Link to={`/products/${product.productId}`}>
          <Image src={product.imageURL} fluid />
        </Link>
      </Col>
      <Col md={10}>
        <Link to={`/products/${product.productId}`}>
          <div>
            <strong>{product.productName}</strong>
          </div>
        </Link>
        <div>Qty : {quantity}</div>
        <div>Price : ${price}</div>
      </Col>
    </Row>
  );
};

const OrderItem = ({ order }) => {
  // Parse the total price and convert the date from a timestamp
  const totalPrice = order.totalPrice;
  const date = new Date(order.date).toLocaleDateString();

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
        {order.products.map((product, index) => (
          <ListGroup.Item key={product._id.$oid}>
            <ProductItem product={product} />
          </ListGroup.Item>
        ))}
        <ListGroup.Item>
          <Row>
            <Col md={{ span: 10, offset: 2 }}>
              <div>
                <strong>Delivery Address:</strong>
                {} {order.shippingAddress.line1},{order.shippingAddress.line2},
                {order.shippingAddress.city},{order.shippingAddress.state},
                {order.shippingAddress.postal_code}
              </div>
              <div>
                {" "}
                <strong>Fulfilled by BOSbuy</strong>
              </div>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

const Orders = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const searchParams = new URLSearchParams(location.search);
      if (searchParams.get("payment") === "done") {
        dispatch(clearCart());
      }

      // Fetch orders from your API
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_ENDPOINT_URL}/order/getUserOrders`,
          {
            withCredentials: true,
          }
        );
        console.log("test: " + JSON.stringify(response.data, null, 2));
        const ordersData = response.data.map((order) => ({
          ...order,
          orderId: order.orderId,
          totalPrice: order.totalPrice,
          date: order.date,
          products: order.products.map((product) => ({
            ...product,
            price: product.price,
            quantity: product.quantity,
          })),
          shippingAddress: {
            ...order.shippingAddress,
          },
        }));
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container">
      <h1>Your Orders</h1>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <OrderItem key={order._id.$oid} order={order} />
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default Orders;
