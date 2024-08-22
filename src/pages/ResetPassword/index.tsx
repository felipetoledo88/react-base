import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ResetPasswordForm from '../../sections/ResetPassword/Form';

const ResetPassword = () => {
    return (
        <Container fluid className="vh-100 d-flex" style={{ padding: 0, maxHeight: '100svh' }}>
            <Row className="w-100" style={{ margin: 0 }}>
                <Col lg={12} className="d-flex align-items-center justify-content-center scraper-bg-primary">
                    <ResetPasswordForm />
                </Col>
            </Row>
        </Container>
    );
};

export default ResetPassword;
