import { useDispatch, useSelector } from "react-redux";
import { Container, Alert } from "react-bootstrap";
import axios from "axios";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from "../features/cart/cartSlice";
import ShoppingCart from "../components/ShoppingCart";

const Cart = () => {
  const cartItems = useSelector((state) => state?.cart?.cartItems);
  const purchaseLimit = useSelector((state) => state?.cart?.purchaseLimit);
  const dispatch = useDispatch();
// Function to remove an item from the cart
  const removeFromCartHandler = (item) => {
    dispatch(removeFromCart(item));
  };
 // Function to add an item to the cart
  const addToCartHandler = (product) => {
    // Check if the item already exists in the cart
    const isItemsExist = cartItems?.find((item) => item?.id === product?.id);
    if (isItemsExist) {
      dispatch(
        updateQuantity({
          id: isItemsExist?.id,
          name: isItemsExist?.name,
          imageURL: isItemsExist?.imageURL,
          description: isItemsExist?.description,
          price: isItemsExist?.price,
          currentPrice: isItemsExist?.price,
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
  };
  // Function to update the quantity of an item in the cart
  const updatedCartQuantity = (product) => {
    const isItemsExist = cartItems?.find((item) => item?.id === product?.id);
    dispatch(
      updateQuantity({
        id: isItemsExist?.id,
        name: isItemsExist?.name,
        imageURL: isItemsExist?.imageURL,
        description: isItemsExist?.description,
        price: isItemsExist?.price,
        currentPrice: isItemsExist?.price,
        quantity: isItemsExist?.quantity - 1,
      })
    );
  };
// Function to handle checkout
  const handleCheckout = async () => {
    try {
      const result = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_ENDPOINT_URL
        }/stripe/create-checkout-session`,
        {
          cartItems,
        },
        {
          withCredentials: true,
        }
      );
      if (result?.data?.url) {
        window.location.href = result?.data?.url;
      }
    } catch (err) {
      console.error(err);
    }
  };
// Function to check if the total quantity exceeds the purchase limit
  const checkQuantityLength = () => {
    const totalLength = cartItems?.reduce((acc, item) => {
      return acc + item?.quantity;
    }, 0);
    return totalLength > purchaseLimit;
  };

  return (
    <Container className="cart">
      <h2 className="my-3">Shopping Cart</h2>
      <hr />
      {cartItems?.length > purchaseLimit ||
        (checkQuantityLength() && (
          <Alert key={"danger"} variant={"danger"}>
            Purchasing limit reached. To complete your order, please place
            maximum of {purchaseLimit} items per order.
          </Alert>
        ))}
      {cartItems?.length ? (
        <ShoppingCart
          handleCheckout={handleCheckout}
          checkQuantityLength={checkQuantityLength}
          addToCartHandler={addToCartHandler}
          removeFromCartHandler={removeFromCartHandler}
          updatedCartQuantity={updatedCartQuantity}
        />
      ) : (
        <p className="no_results">
        Cart is empty
    </p>
    
      )}
    </Container>
  );
};

export default Cart;
