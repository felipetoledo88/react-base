import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './style.css';
import Section from '../../sections/Sections';

const Login = () => {

  return (
    <Container fluid className="vh-100 d-flex" style={{ padding: 0, maxHeight: '100svh' }}>
      <Row className="w-100" style={{ margin: 0 }}>
        <Col lg={12} className="d-flex align-items-center justify-content-center application-bg-primary">
          
            <Section.LoginForm />

        </Col>
      </Row>
    </Container>
  );
};

export default Login;