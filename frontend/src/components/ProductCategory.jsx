import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import laptopcategory from "../assets/laptop_category.webp";
import desktopcategory from "../assets/desktop_category.webp";
import gamingcategory from "../assets/gaming_category.webp";
// Define category data with name, image URL, and path
const categories = [
  { name: "Laptops", imageUrl: laptopcategory, path: "laptops" },
  { name: "Desktops", imageUrl: desktopcategory, path: "desktops" },
  { name: "Gaming", imageUrl: gamingcategory, path: "gaming" },
];

const ProductCategory = () => {
  let navigate = useNavigate();
// Function to navigate to a specific category
  const navigateToCategory = (category) => {
    navigate(`/searchResults?category=${category}`);
  };

  return (
    <Container className="category-container">
      <Row className="g-4">
        {categories.map((category, index) => (
          <Col key={index} xs={12} md={4} className="mb-4">
            <Card className="category-card">
              <Card.Img src={category.imageUrl} alt={category.name} />
              <Card.ImgOverlay>
                <Card.Title className="category-title">
                  {category.name}
                </Card.Title>
              </Card.ImgOverlay>
              <Button
                variant="primary"
                onClick={() => navigateToCategory(category.path)}
              >
                Shop
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductCategory;
