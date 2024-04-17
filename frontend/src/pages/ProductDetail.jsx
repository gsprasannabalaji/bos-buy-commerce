import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
} from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart, updateQuantity } from "../features/cart/cartSlice";
import {
  setPrimaryImageURL,
  setProductDetailsData,
} from "../features/products/productsSlice";
import CustomToast from "../common-components/CustomToast";

const ProductDetail = () => {
  const productDetailsData = useSelector(
    (state) => state?.products?.productDetailsData
  );
  const primaryImageURL = useSelector(
    (state) => state?.products?.primaryImageURL
  );
  const { productId } = useParams();
  const cartItems = useSelector((state) => state?.cart?.cartItems);
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const results = await axios.get(
          `${import.meta.env.VITE_BACKEND_ENDPOINT_URL}/product/${productId}`
        );
        dispatch(setProductDetailsData(results?.data));
      } catch (error) {
        setShowToast(true); 
      }
    }
    fetchProductDetails();
  }, [productId, dispatch]);

  const addToCartHandler = (product) => {
    const isItemsExist = cartItems?.find(
      (item) => item?.id === product?.productId
    );
    if (isItemsExist) {
      dispatch(
        updateQuantity({
          id: isItemsExist?.id,
          name: isItemsExist?.name,
          imageURL: isItemsExist?.imageURL,
          rating: isItemsExist?.rating,
          description: isItemsExist?.description,
          price: isItemsExist?.price,
          currentPrice: product?.price,
          quantity: isItemsExist?.quantity + 1,
        })
      );
    } else {
      dispatch(
        addToCart({
          id: product?.productId,
          name: product?.productName,
          imageURL: product?.imageURL,
          rating: product?.rating,
          description: product?.description,
          price: product?.price,
          currentPrice: product?.price,
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
      <Container className="mt-5 product-detail">
        {productDetailsData ? (
          <Row>
            <Col md={6} sm={12}>
             <Image
                src={primaryImageURL || productDetailsData?.imageURL}
                fluid
              />
              <div className="product-detail__imgwrapper">
                {productDetailsData?.previewImages?.map((item, index) => {
                  return (
                    <Image
                      src={item?.path}
                      onClick={() => {
                        dispatch(setPrimaryImageURL(item?.path));
                      }}
                      className="mt-3 product-detail__imgwrapper__img"
                      key={index}
                    />
                  );
                })}
              </div>
            </Col>
            <Col md={6} sm={12}>
              <h2>{productDetailsData?.productName}</h2>
              {productDetailsData?.description ? (
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
        {showToast && (
          <CustomToast
            toastMessage="Network Failed. Please try again later"
            showToast={showToast}
            toggleToast={() => setShowToast(false)}
            position="top-end"
          />
        )}
      </Container>
    </>
  );
};

export default ProductDetail;
