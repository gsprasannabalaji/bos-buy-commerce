import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { setTopProducts } from "../features/products/productsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

const TopProducts = () => {
  const topProducts = useSelector((state) => state?.products?.topProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const results = await axios.get(
          `${import.meta.env.VITE_BACKEND_ENDPOINT_URL}/product/getTopProducts`
        );
        dispatch(setTopProducts(results?.data));
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <Row className="product-grid__row">
      {topProducts?.length > 0 &&
        topProducts?.map((product, index) => {
          return (
            <Col
              xs={6}
              sm={6}
              md={6}
              lg={3}
              key={index}
              className="product-grid__card"
            >
              <div className="product-grid__card__img-container">
                <Card.Img variant="top" src={product?.imageURL} />
              </div>
              <div className="product-grid__card__info">
                <div className="product-grid__card__info__title">
                  <Link to={`/products/${product?.productId}`}>
                    {product?.productName}
                  </Link>
                </div>
                <div className="product-grid__card__info__price">
                  Price: ${product?.price}
                </div>
              </div>
            </Col>
          );
        })}
    </Row>
  );
};

export default TopProducts;
