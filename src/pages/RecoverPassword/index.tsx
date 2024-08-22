import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Form, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../../services/api';
import Application from '../../components/common/Aplication';


const RecoverPass = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    const [loader, setLoader] = useState(false);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');



    const validatePasswords = () => {
        if (password !== confirmPassword) {
            toast.error('As senhas não coincidem.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validatePasswords()) {
            return;
        }

        if (!token) {
            toast.error('Token não encontrado.');
            return;
        }

        try {
            await api.post('/reset-password', {
                password,
                token,
            });
            toast.success('Senha redefinida com sucesso!');
            setTimeout(() => {
                handleGoToLogin();
            }, 5000);
        } catch (error: any) {
            console.error(error);
            const errorMessage = error.response && error.response.data.message ? error.response.data.message : 'Ocorreu um erro ao tentar redefinir a senha, tente novamente mais tarde.';
            toast.error(errorMessage);
        } finally {
            setLoader(false);
        }
    };

    const handleGoToLogin = () => {
        navigate('/');
    };

    return (
        <Container fluid className="vh-100 d-flex" style={{ padding: 0, maxHeight: '100svh' }}>
            <Row className="w-100" style={{ margin: 0 }}>
                <Col lg={12} className="d-flex align-items-center justify-content-center application-bg-primary">
                    <div className="bg-white p-5 shadow-lg w-100 reset-password-form-container" style={{ maxWidth: '400px', borderRadius: '15px' }}>
                        <img className='mb-4' src={process.env.PUBLIC_URL + "/assets/images/logo.svg"} alt="application logo" style={{ width: '160px', margin: '0 auto', display: 'block' }} />

                        <Form onSubmit={handleSubmit} noValidate className="w-100 mt-4">
                            <Application.Input
                                type="password"
                                placeholder="Nova senha"
                                className="mb-3"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Application.Input
                                type="password"
                                placeholder="Confirme a nova senha"
                                className="mb-3"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <Application.Button
                                className='application-bg-primary mt-4'
                                loader={loader}
                                text="REDEFINIR"
                                type="submit"
                            />

                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>

    );
};

export default RecoverPass;
