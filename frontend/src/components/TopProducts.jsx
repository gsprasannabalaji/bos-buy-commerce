import { Row, Col, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { setTopProducts } from "../features/products/productsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setIsLoading } from "../features/loader/loaderSlice";
import Loader from "../common-components/Loader";

/**
 * TopProducts component displays a list of top products.
 * 
 * @returns {JSX.Element} - Returns the JSX element for the TopProducts component.
 */
const TopProducts = () => {
  // Select topProducts and isLoading state from Redux store
  const topProducts = useSelector((state) => state?.products?.topProducts);
  const isLoading = useSelector((state) => state?.loader?.isLoading);
  const dispatch = useDispatch();
 // Fetch top products from the backend on component mount
  useEffect(() => {
    (async () => {
      try {
        dispatch(setIsLoading(true));
        const results = await axios.get(
          `${import.meta.env.VITE_BACKEND_ENDPOINT_URL}/product/getTopProducts`
        );
        dispatch(setTopProducts(results?.data));
        setTimeout(() => {
          dispatch(setIsLoading(false));
        }, 500);
      } catch (error) {
        console.error(error);
        setTimeout(() => {
          dispatch(setIsLoading(false));
        }, 1000);
      }
    })();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Row className="top-products__row">
            {topProducts?.length > 0 &&
              topProducts?.map((product, index) => {
                return (
                  <Col
                    xs={6}
                    sm={6}
                    md={6}
                    lg={3}
                    key={index}
                    className="top-products__card"
                  >
                    <div className="top-products__card__img-container d-flex justify-content-center mb-2">
                      <Link to={`/products/${product?.productId}`}>
                        <Card.Img src={product?.imageURL} />
                      </Link>
                    </div>
                    <div className="top-products__card__info">
                      <div className="top-products__card__info__title">
                        <Link
                          to={`/products/${product?.productId}`}
                          className="btn-link"
                        >
                          {product?.productName}
                        </Link>
                      </div>
                      <div className="top-products__card__info__price">
                        Price: ${product?.price}
                      </div>
                    </div>
                  </Col>
                );
              })}
          </Row>
        </>
      )}
    </>
  );
};

export default TopProducts;
