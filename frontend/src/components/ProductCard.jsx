import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

/**
 * ProductCard component displays a card representing a product.
 * 
 * @param {string} productId - The unique identifier of the product.
 * @param {string} productName - The name of the product.
 * @param {string} productImg - The URL of the product image.
 * @param {Number} productPrice - The price of the product.
 * @param {Function} handlerClick - Function to handle button click event.
 * @param {string} btnName - The label for the button.
 * @param {Object} product - The product object.
 * @returns {JSX.Element} - Returns the JSX element for the ProductCard component.
 */
const ProductCard = ({
  productId,
  productName,
  productImg,
  productPrice,
  handlerClick,
  btnName,
  product
}) => {

  return (
    <>
      <Card className="product-card flex-row flex-wrap flex-md-nowrap mb-4">
        <Card.Img src={productImg} className="p-4" />
        <Card.Body>
          <Card.Title><Link to={`/products/${productId}`} className="btn-link">{productName}</Link></Card.Title>
          <Card.Text>Price : {`${productPrice}`}</Card.Text>
          <Button variant="primary" onClick={() => handlerClick(product)}>
            {btnName}
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductCard;
