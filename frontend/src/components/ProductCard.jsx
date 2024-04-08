import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";

const ProductCard = ({
  productId,
  productName,
  productImg,
  productRating,
  productDesc,
  productPrice,
  handlerClick,
  btnName,
  product
}) => {

  return (
    <>
      <Card className="product-card flex-row mb-4">
        <Card.Img src={productImg} className="p-4" />
        <Card.Body>
          <Card.Title>{productName}</Card.Title>
          <Card.Text>{productDesc}</Card.Text>
          <Card.Text>Price : {productPrice}</Card.Text>
          <p>Rating: {productRating}</p>
          <Button variant="primary" onClick={() => handlerClick(product)}>
            {btnName}
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductCard;
