import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  InputGroup,
  FormControl,
  Nav,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faBoxOpen,
  faPlusSquare,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setUser } from "../features/user/userSlice";

function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);
// Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);
// Function to fetch orders
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_ENDPOINT_URL}/order/getAllOrders`
      );
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };
// Function to handle user logout
  const handleLogOut = async () => {
    try {
      await axios.get(
        `${import.meta.env.VITE_BACKEND_ENDPOINT_URL}/user/clearCookies`,
        { withCredentials: true }
      );
      localStorage.removeItem("userDetails");
      dispatch(
        setUser({
          ...user,
          email: "",
          password: "",
          isUserValid: false,
        })
      );
      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };
// Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };
// Function to render table rows
  const renderTableRows = () => {
    const filteredOrders = orders.filter((order) =>
      order.orderId.toLowerCase().includes(searchTerm) ||
      (order.email && order.email.toLowerCase().includes(searchTerm)) ||
      order.products.some(
        (product) =>
          (product.productName && product.productName.toLowerCase().includes(searchTerm)) ||
          (product.description && product.description.toLowerCase().includes(searchTerm))
      ) ||
      (order.shippingAddress &&
       Object.values(order.shippingAddress)
         .filter(Boolean) // Filters out undefined or null values
         .join(" ")
         .toLowerCase()
         .includes(searchTerm))
    );
  
    return filteredOrders.flatMap((order) =>
      order.products.map((product, index) => (
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
              {order.shippingAddress ? formatAddress(order.shippingAddress) : "No Address Provided"}
            </td>
          ) : null}
        </tr>
      ))
    );
  };
  
  const formatAddress = (address) => {
    return `${address.line1 ? `${address.line1}, ` : ""}${
      address.line2 ? `${address.line2}, ` : ""
    }${address.city ? `${address.city}, ` : ""}${
      address.state ? `${address.state}, ` : ""
    }${address.postal_code ? `${address.postal_code}, ` : ""}${
      address.country || ""
    }`.trim();
  };
  

  return (
    <>
      <Container fluid>
        <Row>
          <Col md={2} className="d-none d-md-block bg-light sidebar">
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
          <Col md={10} className="p-0">
            <Container fluid>
              <Row className="align-items-center">
                <Col md={6}>
                  <h1>Order List</h1>
                </Col>
                <Col md={6}>
                  <InputGroup>
                    <FormControl
                      placeholder="Search orders"
                      aria-label="Search orders"
                      onChange={handleSearchChange}
                    />
                    <InputGroup.Text>
                      <i className="fa fa-search"></i>
                    </InputGroup.Text>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Table responsive striped bordered hover>
                    <thead>
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
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AllOrders;
