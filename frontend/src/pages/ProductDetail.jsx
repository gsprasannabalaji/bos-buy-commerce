import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart, updateQuantity } from "../features/cart/cartSlice";
import {
  setPrimaryImageURL,
  setProductDetailsData,
} from "../features/products/productsSlice";
import TopProducts from "../components/TopProducts";
import { setToast } from "../features/toast/toastSlice";

const ProductDetail = () => {
  const productDetailsData = useSelector(
    (state) => state?.products?.productDetailsData
  );
  const primaryImageURL = useSelector(
    (state) => state?.products?.primaryImageURL
  );
  const isLoading = useSelector((state) => state?.loader?.isLoading);
  const { productId } = useParams();
  const cartItems = useSelector((state) => state?.cart?.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const results = await axios.get(
          `${import.meta.env.VITE_BACKEND_ENDPOINT_URL}/product/${productId}`
        );
        dispatch(setProductDetailsData(results?.data));
        dispatch(setPrimaryImageURL(results?.data?.previewImages?.[0]?.path));
      } catch (error) {
        dispatch(
          setToast({
            toast: {
              message: "Network Failed. Please try again later",
              variant: "error",
            },
            showToast: true,
          })
        );
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
          description: product?.description,
          price: product?.price,
          currentPrice: product?.price,
          quantity: 1,
        })
      );
    }
    dispatch(
      setToast({
        toast: {
          message: "Added to cart",
          variant: "success",
        },
        showToast: true,
      })
    );
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
          <>
            <Row className="mb-3">
              <Col md={6} sm={12}>
                <div className="product-detail__img-container">
                  <Image
                    src={primaryImageURL || productDetailsData?.imageURL}
                    className="product-detail__img-container__img"
                  />
                </div>
                <div className="product-detail__preview-container mb-5">
                  {productDetailsData?.previewImages?.map((item, index) => {
                    return (
                      <div
                        className={`product-detail__imgwrapper ${
                          primaryImageURL === item?.path ? "active" : ""
                        }`}
                        key={index}
                      >
                        <Image
                          src={item?.path}
                          onClick={() => {
                            dispatch(setPrimaryImageURL(item?.path));
                          }}
                          className="mt-3 product-detail__imgwrapper__img"
                          key={index}
                        />
                      </div>
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
                <p className="fw-bold">Price: ${productDetailsData.price}</p>
                <Button
                  variant="primary"
                  onClick={() => addToCartHandler(productDetailsData)}
                >
                  Add to Cart
                </Button>
              </Col>
            </Row>
            <h3 className="mb-3">Similar Products</h3>
            <TopProducts />
          </>
        ) : (
          <h1 className="no_results">Product Not Found</h1>
        )}
      </Container>
    </>
  );
};

export default ProductDetail;
