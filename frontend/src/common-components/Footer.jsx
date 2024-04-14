import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faPinterest, faInstagram } from '@fortawesome/free-brands-svg-icons';
import "../scss/style.scss"

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-dark text-white">
      <Container>
        <Row>
          <Col md={4}>
            <h5>MediBuddy</h5>
            <p>
              Information on Hospitals, Doctors and Medicines - all at one place! Ask a
              Question about your health, Register with us and consult a doctor for free*, Plan a
              visit, Know more about surgeries.
            </p>
            <div className="social-icons">
              <FontAwesomeIcon icon={faFacebook} />
              <FontAwesomeIcon icon={faTwitter} />
              <FontAwesomeIcon icon={faPinterest} />
              <FontAwesomeIcon icon={faInstagram} />
            </div>
          </Col>
          <Col md={4}>
            <h5>Important Links</h5>
            <ul className="list-unstyled">
              <li>About Us</li>
              <li>Services</li>
              <li>Profile</li>
              <li>Contact</li>
              <li>Hospitals Near Me</li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Featured Services</h5>
            <ul className="list-unstyled">
              <li>Book Appointments</li>
              <li>Ask Questions</li>
            </ul>
            <h5>Information</h5>
            <p>Phone: 882-569-756</p>
            <p>Email: medibuddy2023@outlook.com</p>
            <p>Address: 123 Main St, Boston, MA</p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <p>© MediBuddy is Heartfully Inspired by Lybrate</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;


