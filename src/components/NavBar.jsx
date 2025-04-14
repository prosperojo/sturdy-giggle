import React, { useContext } from 'react';
import { Navbar, Container, Nav, Button, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from '../context/AuthContext';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();


  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">DevBlog</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className='mx-3'>Home</Nav.Link>
            <Nav.Link as={Link} to="/BlogPost" className='mx-3'>Blogs</Nav.Link>

            {user ? (
              <>
                <Nav.Link as={Link} to="/CreatePost" className='mx-3'>Create Blog</Nav.Link>
                <Navbar.Text className="ms-5 text-light">Hello, {user.username}</Navbar.Text>
                <Button variant="outline-danger" className='ms-2' onClick={() => { logout(); navigate('/'); }}>Logout</Button>
              </>
            ) : (
              <Row className="ms-auto">
                <Col xs="auto">
                  <Button as={Link} to='/SignUp' type="submit">Get Started</Button>
                </Col>
              </Row>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
