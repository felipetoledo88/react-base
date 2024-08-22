import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './style.css';
import Section from '../../sections/Sections';

const Login = () => {

  return (
    <Container fluid className="vh-100 d-flex" style={{ padding: 0, maxHeight: '100svh' }}>
      <Row className="w-100" style={{ margin: 0 }}>
        <Col lg={5} className="d-none d-lg-flex align-items-center justify-content-center scraper-bg-primary p-0">
          <img
            src={process.env.PUBLIC_URL + "/assets/images/people/women.jpg"}
            alt="User"
            className="w-100 h-100 object-cover"
            style={{ maxHeight: '100svh', objectFit: 'cover' }}
          />
        </Col>
        <Col lg={7} className="d-flex align-items-center justify-content-center scraper-bg-primary">
          
            <Section.LoginForm />

        </Col>
      </Row>
    </Container>
  );
};

export default Login;