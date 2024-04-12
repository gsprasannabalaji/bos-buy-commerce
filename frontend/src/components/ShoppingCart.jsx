import { Row, Col, Button } from "react-bootstrap";
import {
  MdAddCircleOutline,
  MdOutlineRemoveCircleOutline,
} from "react-icons/md";
import { useSelector } from "react-redux";

const ShoppingCart = ({
  handleCheckout,
  addToCartHandler,
  removeFromCartHandler,
  checkQuantityLength,
  updatedCartQuantity,
}) => {
  const cartItems = useSelector((state) => state?.cart?.cartItems);
  const purchaseLimit = useSelector((state) => state?.cart?.purchaseLimit);
  const subTotal = cartItems?.reduce((acc, item) => {
    return acc + item?.price * item?.quantity;
  }, 0);

  return (
    <>
      <Row>
        <Col xs={12} lg={8}>
          {cartItems?.length > 0 &&
            cartItems?.map((item, index) => {
              return (
                <Row key={index} className="mb-3">
                  <Col xs={2}>
                    <img src={item?.imageURL} className="col-12" />
                  </Col>
                  <Col xs={4}>{item?.name}</Col>
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
          {cartItems?.length > 0 && (
            <Button
              variant="warning"
              disabled={
                cartItems?.length > purchaseLimit || checkQuantityLength()
              }
              onClick={() => {
                handleCheckout();
              }}
            >
              Proceed to Checkout
            </Button>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ShoppingCart;
