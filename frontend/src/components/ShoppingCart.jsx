import { Row, Col, Button } from "react-bootstrap";
import {
  MdAddCircleOutline,
  MdOutlineRemoveCircleOutline,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

/**
 * ShoppingCart component displays the items in the shopping cart and handles checkout functionality.
 * 
 * @param {Function} handleCheckout - Function to handle the checkout process.
 * @param {Function} addToCartHandler - Function to add items to the cart.
 * @param {Function} removeFromCartHandler - Function to remove items from the cart.
 * @param {Function} checkQuantityLength - Function to check if cart quantity exceeds a limit.
 * @param {Function} updatedCartQuantity - Function to update the quantity of an item in the cart.
 * @returns {JSX.Element} - Returns the JSX element for the ShoppingCart component.
 */
const ShoppingCart = ({
  handleCheckout,
  addToCartHandler,
  removeFromCartHandler,
  checkQuantityLength,
  updatedCartQuantity,
}) => {
  const cartItems = useSelector((state) => state?.cart?.cartItems);
  const purchaseLimit = useSelector((state) => state?.cart?.purchaseLimit);
  const { isUserValid } = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const subTotal = cartItems?.reduce((acc, item) => {
    return acc + item?.price * item?.quantity;
  }, 0);

  return (
    <>
      <Row className="mb-5">
        <Col xs={12} lg={8}>
          {cartItems?.length > 0 &&
            cartItems?.map((item, index) => {
              return (
                <Row key={index} className="mb-3">
                  <Col xs={2}>
                    <Link to={`/products/${item?.id}`} className="btn-link">
                      <img src={item?.imageURL} className="col-12" />
                    </Link>
                  </Col>
                  <Col xs={4}>
                    <Link to={`/products/${item?.id}`} className="btn-link">
                      {item?.name}
                    </Link>
                  </Col>
                  <Col xs={3} className="d-flex flex-column align-items-center">
                    <div className="d-flex">
                      {
                        <MdOutlineRemoveCircleOutline
                          size={24}
                          style={{
                            color: item?.quantity > 1 ? "black" : "grey",
                          }}
                          onClick={() => {
                            if (item?.quantity > 1) {
                              updatedCartQuantity(item);
                            }
                          }}
                        />
                      }
                      <p className="mx-3">{item?.quantity}</p>
                      <MdAddCircleOutline
                        size={24}
                        onClick={() => addToCartHandler(item)}
                      />
                    </div>
                    <Button
                      className="d-flex p-0 align-items-center"
                      variant="link"
                      onClick={() => removeFromCartHandler(item)}
                    >
                      Remove
                    </Button>
                  </Col>
                  <Col
                    xs={3}
                    className="text-center"
                  >{`$${item?.currentPrice}`}</Col>
                </Row>
              );
            })}
        </Col>
        <Col lg={4}>
          <div>
            <p className="text-capitalize mb-3 fw-bold">Order Summary</p>
            <Col lg={12} className="mb-4">
              <Row>
                <Col lg={6}>Sub Total</Col>
                <Col lg={6} className="text-end">
                  {`$${subTotal}`}
                </Col>
              </Row>
              <Row>
                <Col lg={6}>Shipping</Col>
                <Col lg={6} className="text-end text-success">
                  Free
                </Col>
              </Row>
              <hr />
              <Row>
                <Col lg={6}>Total</Col>
                <Col lg={6} className="text-end">
                  {`$${subTotal}`}
                </Col>
              </Row>
            </Col>
          </div>
          {isUserValid ? (
            cartItems?.length > 0 && (
              <Button
                variant="primary"
                disabled={
                  cartItems?.length > purchaseLimit || checkQuantityLength()
                }
                onClick={() => {
                  handleCheckout();
                }}
              >
                Proceed to Checkout
              </Button>
            )
          ) : (
            <Button
              variant="primary"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login to Checkout
            </Button>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ShoppingCart;
