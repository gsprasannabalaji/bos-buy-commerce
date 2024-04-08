import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Container } from "react-bootstrap";
import axios from 'axios';
import { removeFromCart } from "../features/cart/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const removeFromCartHandler = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleCheckout = async () => {
    // this has to be integrated once the backed is ready
    // try {
    //   const result  = await axios.post("http://localhost:3002/api/Stripe/create-checkout-session", {
    //     cartItems,
    //     userId: 1
    //   });
    //   if(result?.data?.url) {
    //     window.location.href = result?.data?.url;
    //   }
    // } catch (err) {
    //   console.error(err);
    // }
  };
  
  return (
    <Container className="cart">
      <h1>Shopping Cart</h1>
      {cartItems?.length ? (
        cartItems?.map((item, index) => {
          return (
            <ProductCard
              key={index}
              productId={item?.productId}
              productName={item?.name}
              productDesc={item?.description}
              productImg={item?.imageURL}
              productRating={item?.rating}
              productPrice={item?.price}
              product={item}
              handlerClick={(product) => removeFromCartHandler(product)}
              btnName="Remove from Cart"
            />
          );
        })
      ) : (
        <p>Cart is empty</p>
      )}
      <hr />
      {cartItems?.length > 0 && (
        <p>SubTotal : ${cartItems?.reduce((acc, item)=> {
          return acc + item?.price * item?.quantity;
        }, 0)}</p>
      )}
      {cartItems?.length > 0 && (
        <button
          onClick={() => {
            handleCheckout();
          }}
        >
          Proceed to Checkout
        </button>
      )}
    </Container>
  );
};

export default Cart;
