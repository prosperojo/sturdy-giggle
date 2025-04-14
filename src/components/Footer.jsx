import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>
              A modern blog platform for tech creators, thinkers, and storytellers. 
              Write, publish, and inspire effortlessly.
            </p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="">About</a></li>
              <li><a href="">Privacy Policy</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact</h5>
            <p className="footer-links"><a href="mailto:prosperojo2@gmail.com">Email: prosperojo2@gmail.com</a></p>
            <p className="footer-links"><a href="tel:+2348131694341">Phone: +234 813 169 4341</a></p>
          </Col>
        </Row>
        <div className="text-center mt-3">
          <p>&copy; {new Date().getFullYear()} DevBlog. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
