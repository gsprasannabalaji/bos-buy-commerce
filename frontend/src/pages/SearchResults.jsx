import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "../features/cart/cartSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { setSearchedProducts } from "../features/products/productsSlice";
import CustomToast from "../common-components/CustomToast";

const SearchResults = () => {
  const productData = useSelector((state) => state?.products?.productsList);
  const [searchParams] = useSearchParams();
  const cartItems = useSelector((state) => state?.cart?.cartItems);
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const results = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_ENDPOINT_URL
          }/product/search?name=${searchParams?.get("q")}`
        );
        dispatch(setSearchedProducts(results?.data));
      } catch (error) {
        setShowToast(true);
      }
    })();
  }, [searchParams?.get("q")]);

  useEffect(() => {
    (async () => {
      try {
        const results = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_ENDPOINT_URL
          }/product/category?category=${searchParams?.get("category")}`
        );
        dispatch(setSearchedProducts(results?.data));
      } catch (error) {
        setShowToast(true);
      }
    })();
  }, [searchParams?.get("category")]);

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
          currentPrice: isItemsExist?.price,
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
          currentPrice: product?.price,
          quantity: 1,
        })
      );
    }
  };
  const headingText = searchParams.get("q") 
    ? `Results for ${searchParams.get("q")}`
    : searchParams.get("category")
    ? `Category: ${searchParams.get("category")}`
    : 'Search Results';

  return (
    <div className="search-results container">
      <h2>{headingText}</h2>
      {productData?.length > 0 ? productData?.map((item, index) => {
        return (
          <ProductCard
            key={index}
            productId={item?.productId}
            productName={item?.productName}
            productDesc={item?.description}
            productImg={item?.imageURL}
            productRating={item?.rating}
            productPrice={item?.price}
            product={item}
            handlerClick={(product) => addToCartHandler(product)}
            btnName="Add to Cart"
          />
        );
      })
        :
        <h1 className="d-flex justify-content-center align-items-center font-weight-bold">No results found</h1>
      }
      {showToast && (
        <CustomToast
          toastMessage="Network Failed. Please try again later"
          showToast={showToast}
          toggleToast={() => setShowToast(false)}
          position="top-end"
        />
      )}
    </div>
  );
};

export default SearchResults;