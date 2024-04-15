import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Modal,
  Form,
  ToastContainer,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart, updateQuantity } from "../features/cart/cartSlice";
import { setProductDetailsData } from "../features/products/productsSlice";
import CustomToast from "../common-components/CustomToast";

const ProductDetail = () => {
  const productDetailsData = useSelector(
    (state) => state.products.productDetailsData
  );
  const { productId } = useParams();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_ENDPOINT_URL}/product/${productId}`
        );
        dispatch(setProductDetailsData(response.data));
      } catch (error) {
        console.log("Error fetching product details:", error);
        setShowToast(true);
      }
    }
    fetchProductDetails();
  }, [productId, dispatch]);

  const addToCartHandler = (product) => {
    const itemExists = cartItems.find((item) => item.id === product.productId);
    if (itemExists) {
      dispatch(
        updateQuantity({
          ...itemExists,
          quantity: itemExists.quantity + 1,
        })
      );
    } else {
      dispatch(
        addToCart({
          id: product.productId,
          name: product.productName,
          imageURL: product.imageURL,
          rating: product.rating,
          description: product.description,
          price: product.price,
          quantity: 1,
        })
      );
    }
  };

  const getDescriptionAsList = (description) => {
    const points = description
      .split(/(?=\d+\.)/)
      .filter((point) => point.trim() !== "");
    return (
      <ul>
        {points.map((point, index) => (
          <li key={index}>{point.replace(/^\d+\./, "").trim()}</li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <Container className="mt-5">
        {productDetailsData ? (
          <Row>
            <Col md={6} sm={12}>
              <Image src={productDetailsData.imageURL} fluid />
            </Col>
            <Col md={6} sm={12}>
              <h2>{productDetailsData.productName}</h2>
              {productDetailsData.description ? (
                getDescriptionAsList(productDetailsData.description)
              ) : (
                <p>No description available.</p>
              )}
              <p>Price: ${productDetailsData.price}</p>
              <Button
                variant="primary"
                onClick={() => addToCartHandler(productDetailsData)}
              >
                Add to Cart
              </Button>
            </Col>
          </Row>
        ) : (
          <h1 className="text-center">Product Not Found</h1>
        )}
        <CustomToast
          toastMessage="Network error, please try again later."
          showToast={showToast}
          onClose={() => setShowToast(false)}
          position="top-end"
        />
      </Container>
    </>
  );
};

export default ProductDetail;
