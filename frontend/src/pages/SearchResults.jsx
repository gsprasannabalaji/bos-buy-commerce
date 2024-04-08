import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "../features/cart/cartSlice";

const SearchResults = () => {
  const productData = [
    {
      productId: 1,
      name: "laptop1",
      price: 1000,
      imageURL:
        "https://m.media-amazon.com/images/I/71-R1TOTtwL._AC_UY218_.jpg",
      description: "laptop1 description",
      rating: 5,
    },
    {
      productId: 2,
      name: "laptop2",
      price: 2000,
      imageURL:
        "https://m.media-amazon.com/images/I/61ZCdzmymsL._AC_UY218_.jpg",
      description:
        "laptop2 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque a odio perspiciatis tenetur soluta illum ducimus minus. Quibusdam, minus quam quo inventore nihil ut maiores, consequuntur, ab officiis tenetur nesciunt?",

      rating: 3,
    },
  ];
  const [searchParams] = useSearchParams();
  const cartItems = useSelector((state) => state?.cart?.cartItems);

  const dispatch = useDispatch();

  const addToCartHandler = (product) => {
    const isItemsExist = cartItems?.find((item) => item?.id === product?.productId);
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
    <div className="search-results container">
      <h2>Results for {searchParams?.get("q")}</h2>
      {productData?.map((item, index) => {
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
            handlerClick={(product) => addToCartHandler(product)}
            btnName="Add to Cart"
          />
        );
      })}
    </div>
  );
};

export default SearchResults;
