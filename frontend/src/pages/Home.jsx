import { Carousel, Image, Container, Row, Col, Card } from "react-bootstrap";
import banner1 from "../assets/banner1.webp";
import banner2 from "../assets/banner2.webp";
import { Link } from "react-router-dom";

const Home = () => {
  const products = [
    {
      productId: 1,
      name: "laptop1",
      price: 1000,
      imageURL:
        "https://m.media-amazon.com/images/I/71WV1hwFr1L.__AC_SX300_SY300_QL70_FMwebp_.jpg",
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
    {
      productId: 3,
      name: "laptop3",
      price: 4000,
      imageURL:
        "https://m.media-amazon.com/images/I/71WV1hwFr1L.__AC_SX300_SY300_QL70_FMwebp_.jpg",
      description:
        "laptop2 description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque a odio perspiciatis tenetur soluta illum ducimus minus. Quibusdam, minus quam quo inventore nihil ut maiores, consequuntur, ab officiis tenetur nesciunt?",

      rating: 5,
    },
  ];
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
        <h1 className="my-4">Laptops</h1>
        <Row>
          {products?.map((product, index) => {
            return (
              <Col sm={4} key={index}>
                <Card>
                  <Card.Img variant="top" src={product?.imageURL} />
                  <Card.Body>
                    <Card.Title>
                      <Link to={`/products/${product?.productId}`}>
                        {product?.name}
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
