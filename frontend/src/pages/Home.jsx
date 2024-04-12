import { Carousel, Image, Container, Row, Col, Card } from "react-bootstrap";
import banner1 from "../assets/banner1.webp";
import banner2 from "../assets/banner2.webp";
import { Link } from "react-router-dom";
import { setTopProducts } from "../features/products/productsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import CategoryComponent from './ProductCategory';

const Home = () => {
  const topProducts = useSelector((state) => state?.products?.topProducts);
  const dispatch = useDispatch();

  useEffect(()=> {
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
    <>
      <Carousel>
        <Carousel.Item>
          <Image className="d-block w-100" src={banner1} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <Image className="d-block w-100" src={banner2} alt="Second slide" />
        </Carousel.Item>
      </Carousel>
      <Container>
      <div className="mt-4">
      <h1 className="my-4">Category</h1>
        <CategoryComponent />
      </div>
        <h1 className="my-4">Laptops</h1>
        <Row>
          {topProducts?.length > 0 && topProducts?.map((product, index) => {
            return (
              <Col sm={4} key={index}>
                <Card>
                  <Card.Img variant="top" src={product?.imageURL} />
                  <Card.Body>
                    <Card.Title>
                      <Link to={`/products/${product?.productId}`}>
                        {product?.productName}
                      </Link>
                    </Card.Title>
                    <Card.Text>Price: {product?.price}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default Home;
