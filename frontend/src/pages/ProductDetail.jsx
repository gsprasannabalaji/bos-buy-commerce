import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { addToCart, updateQuantity } from "../features/cart/cartSlice";

const ProductDetail = () => {
  const product = useSelector((state) => state?.products?.productsList[0]);

  const { productId } = useParams();
  const cartItems = useSelector((state) => state?.cart?.cartItems);

  const dispatch = useDispatch();

  useEffect(() => {
    // api logic should be updated and this snippet refactored once backend is ready.
    console.log("product id: " + productId);
  }, []);

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
          quantity: isItemsExist?.quantity + 1,
        })
      );
    } else {
      dispatch(
        addToCart({
          id: product?.productId,
          name: product?.name,
          imageURL: product?.imageURL,
          rating: product?.rating,
          description: product?.description,
          price: product?.price,
          quantity: 1,
        })
      );
    }
  };

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col md={6} sm={12}>
            <Image src={product?.imageURL} fluid />
          </Col>
          <Col md={6} sm={12}>
            <h2>{product?.name}</h2>
            <p>{product?.description}</p>
            <p>Price: ${product?.price}</p>
            <Button variant="primary" onClick={() => addToCartHandler(product)}>Add to Cart</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductDetail;
