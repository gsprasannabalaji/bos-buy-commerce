import { Button, Carousel, Container } from "react-bootstrap";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import ProductCategory from "../components/ProductCategory";
import TopProducts from "../components/TopProducts";
import banner3 from "../assets/banner3.jpg";
import { useNavigate } from "react-router-dom";
import Footer from "../common-components/Footer";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Carousel class="carousel">
        <Carousel.Item>
          <div className="row">
            <div className="col-xs-12 col-lg-8 pe-0">
              <img src={banner1} alt={"banner1"} className="img-fluid" />
            </div>
            <div className="col-xs-12 col-lg-4 text-container carousel__content1-right">
              <div className="text-center text-lg-start py-5 py-lg-4">
                <h1 className="mb-3">Get to know Mac.</h1>
                <h3 className="carousel__content1-right__subtitle">
                  If you can dream it,
                </h3>
                <h3 className="carousel__content1-right__subtitle mb-3">
                  Mac can do it.
                </h3>
                <Button
                  variant="primary"
                  onClick={() => {
                    navigate("/searchResults?q=mac");
                  }}
                >
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="row">
            <div className="col-xs-12 col-lg-8 pe-0">
              <img src={banner2} alt={"banner2"} className="img-fluid" />
            </div>
            <div className="col-xs-12 col-lg-4 text-container carousel__content2-right">
              <div className="text-center text-lg-start py-5 py-lg-4">
                <h1
                  className="fs-1 pt-5 carousel__content2-right__title"
                  style={{ color: "white" }}
                >
                  Meet HP Chromebooks
                </h1>
                <p>--------------------------------------------------</p>
                <h3 className="carousel__content2-right__subtitle">
                  Easy to use.
                </h3>
                <h3 className="mb-3">Easy to love.</h3>
                <Button
                  variant="primary"
                  onClick={() => {
                    navigate("/searchResults?q=hp");
                  }}
                >
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="row">
            <div className="col-xs-12 col-lg-8 pe-0">
              <img src={banner3} alt={"banner3"} className="img-fluid" />
            </div>
            <div className="col-xs-12 col-lg-4 text-container carousel__content3-right">
              <div className="text-center text-lg-start py-5 py-lg-4">
                <h1 className="fs-1 pt-5 mb-5">
                  Unleash The Gaming Beast With Our Powerful Laptops!
                </h1>
                <Button
                  variant="primary"
                  onClick={() => {
                    navigate("/searchResults?category=gaming");
                  }}
                >
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
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
      <Footer />
    </>
  );
};

export default Home;
