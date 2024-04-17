// Orders.js
import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import OrderItem from '../components/OrderItem'; // Make sure this path is correct
import { Container } from "react-bootstrap";
import { setOrders } from "../features/orders/ordersSlice";

const Orders = () => {
  const orders = useSelector((state) => state?.orders?.orders);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrders = async () => {
      const searchParams = new URLSearchParams(location.search);
      if (searchParams.get("payment") === "done") {
        dispatch(clearCart());
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_ENDPOINT_URL}/order/getUserOrders`,
          {
            withCredentials: true,
          }
        );
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
        dispatch(setOrders(ordersData));
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [location.search, dispatch]);

  return (
    <Container className="container">
      <h1>Your Orders</h1>
      <hr />
      {orders.length > 0 ? (
        orders.map((order) => (
          <OrderItem key={order._id.$oid} order={order} />
        ))
      ) : (
        <p className="no_result">No orders found.</p>
      )}
    </Container>
  );
};

export default Orders;
