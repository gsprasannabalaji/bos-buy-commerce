import { useSearchParams, useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "../features/cart/cartSlice";
import { useEffect } from "react";
import axios from "axios";
import { setSearchedProducts } from "../features/products/productsSlice";
import Loader from "../common-components/Loader";
import { setIsLoading } from "../features/loader/loaderSlice";
import { setToast } from "../features/toast/toastSlice";

const SearchResults = () => {
  const productData = useSelector((state) => state?.products?.productsList);
  const [searchParams] = useSearchParams();
  const cartItems = useSelector((state) => state?.cart?.cartItems);
  let location = useLocation();
  let queryParams = new URLSearchParams(location?.search);
  const isLoading = useSelector((state) => state?.loader?.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    if (queryParams.has("q")) {
      (async () => {
        try {
          dispatch(setIsLoading(true));
          const results = await axios.get(
            `${
              import.meta.env.VITE_BACKEND_ENDPOINT_URL
            }/product/search?name=${searchParams?.get("q")}`
          );
          dispatch(setSearchedProducts(results?.data));
          setTimeout(() => {
            dispatch(setIsLoading(false));
          }, 500);
        } catch (error) {
          setTimeout(() => {
            dispatch(setIsLoading(false));
            dispatch(setToast({
              message: "Network Failed. Please try again later",
              variant: "error",
            }));
          }, 500);
        }
      })();
    }
  }, [searchParams?.get("q")]);

  useEffect(() => {
    if (queryParams.has("category")) {
      (async () => {
        try {
          dispatch(setIsLoading(true));
          const results = await axios.get(
            `${
              import.meta.env.VITE_BACKEND_ENDPOINT_URL
            }/product/category?category=${searchParams?.get("category")}`
          );
          dispatch(setSearchedProducts(results?.data));
          setTimeout(() => {
            dispatch(setIsLoading(false));
          }, 500);
        } catch (error) {
          setTimeout(() => {
            dispatch(setIsLoading(false));
            dispatch(setToast({
              message: "Network Failed. Please try again later",
              variant: "error",
            }));
          }, 500);
        }
      })();
    }
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
  const headingText = searchParams.get("q")
    ? `Results for ${searchParams.get("q")}`
    : searchParams.get("category")
    ? `Category: ${searchParams.get("category")}`
    : "Search Results";

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="search-results container">
          <h2>{headingText}</h2>
          {productData?.length > 0 ? (
            productData?.map((item, index) => {
              return (
                <ProductCard
                  key={index}
                  productId={item?.productId}
                  productName={item?.productName}
                  productDesc={item?.description}
                  productImg={item?.imageURL}
                  productPrice={item?.price}
                  product={item}
                  handlerClick={(product) => addToCartHandler(product)}
                  btnName="Add to Cart"
                />
              );
            })
          ) : (
            <h1 className="d-flex justify-content-center align-items-center font-weight-bold">
              No results found
            </h1>
          )}
        </div>
      )}
    </>
  );
};

export default SearchResults;
