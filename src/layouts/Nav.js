import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
const Navigation = () => {
  return (
    <Navbar bg="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="#home" className="text-white">ReduxJs/Tool Kit</Navbar.Brand>
        <Navbar id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-auto">
            <Link to='/' className="mx-1">Home</Link>
            <Link to='posts'>Posts</Link>
          </Nav>
        </Navbar>
      </Container>
    </Navbar>
  );
};

export default Navigation;
