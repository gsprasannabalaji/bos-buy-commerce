import { Carousel, Image, Container } from "react-bootstrap";
import banner1 from "../assets/banner1.webp";
import banner2 from "../assets/banner2.webp";
import ProductCategory from "../components/ProductCategory";
import TopProducts from "../components/TopProducts";

const Home = () => {
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
          <h2 className="my-4">Category</h2>
          <ProductCategory />
        </div>
        <h2 className="my-4">Top Products</h2>
        <TopProducts />
      </Container>
    </>
  );
};

export default Home;
