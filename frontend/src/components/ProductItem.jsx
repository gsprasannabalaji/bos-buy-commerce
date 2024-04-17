// ProductItem.js
import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
  const price = product.price;
  const quantity = product.quantity;

  return (
    <Row className="mb-3">
      <Col md={2}>
        <Link to={`/products/${product.productId}`}>
          <Image src={product.imageURL} fluid />
        </Link>
      </Col>
      <Col md={10}>
        <Link to={`/products/${product.productId}`} className="btn-link">
          <div>
            <strong>{product.productName}</strong>
          </div>
        </Link>
        <div>Qty : {quantity}</div>
        <div>Price : ${price}</div>
      </Col>
    </Row>
  );
};

export default ProductItem;
