import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="mt-auto py-3 bg-dark text-white footer">
      <Container>
        <Row>
          <Col md={4}>
            <h5>BOSbuy</h5>
            <p>
              Find the best deals on laptops and desktops tailored to your needs. Explore our extensive range of products from top brands, get expert advice, and unmatched customer support.
            </p>
            <div className="d-flex">
            <FontAwesomeIcon icon={faFacebook} className='me-3' />
              <FontAwesomeIcon icon={faTwitter} className='me-3' />
              <FontAwesomeIcon icon={faLinkedin} className='me-3' />
              <FontAwesomeIcon icon={faInstagram} />
            </div>
          </Col>
          <Col md={4}>
            <h5>Explore</h5>
            <ul className="list-unstyled">
              <li><a href="/" className='footer__cta'>About Us</a></li>
              <li><a href="/" className='footer__cta'>Laptops</a></li>
              <li><a href="/" className='footer__cta'>Desktops</a></li>
              <li><a href="/" className='footer__cta'>Contact Us</a></li>
              <li><a href="/" className='footer__cta'>Support</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Customer Service</h5>
            <ul className="list-unstyled">
              <li><a href="/" className='footer__cta'>FAQ</a></li>
              <li><a href="/" className='footer__cta'>Return Policy</a></li>
              <li><a href="/" className='footer__cta'>Warranty Information</a></li>
            </ul>
            <h5>Contact Information</h5>
            <p>Phone: 800-123-4567</p>
            <p>Email: support@bosbuy.com</p>
            <p>Address: 123 Tech Ave, Silicon Valley, CA</p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <p>© 2024 BOSbuy - Your Trusted Technology Partner</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
