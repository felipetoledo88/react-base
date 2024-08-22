import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { faEnvelope, faKey, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import { useAuth } from '../../../contexts/Auth';
import Application from '../../../components/common/Aplication';

const LoginForm = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated, updateUserAccessLevel } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loader, setLoader] = useState(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoader(true);

        // Validação simples dos campos de email e senha
        if (!email || !password) {
            toast.error('Por favor, preencha todos os campos');
            setLoader(false);
            return;
        }

        try {
            const response = await api.post('/login', { email, password });
            const { token } = response.data;
            const userAccessLevel = response.data.user.profile_id;

            // Armazena o token no localStorage
            localStorage.setItem('token', token);
            // Atualiza o estado de autenticação e o nível de acesso do usuário
            updateUserAccessLevel(userAccessLevel);
            setIsAuthenticated(true);

            // Navega para a página panel
            navigate('/panel');
        } catch (error) {
            console.log(error);
            toast.error('Erro ao fazer login. Verifique suas credenciais.');
        } finally {
            setLoader(false);
        }
    };

    const handleForgotPassword = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigate('/reset-password');
    };

    return (
        <div className="bg-white p-5 shadow-lg w-100 login-form-container" style={{ maxWidth: '400px', borderRadius: '15px' }}>
            <img className='mb-4' src={process.env.PUBLIC_URL + "/assets/images/logo.svg"} alt="application logo" style={{ width: '160px', margin: '0 auto', display: 'block' }} />
            <Form className='pt-4' onSubmit={handleLogin}>
                <Application.Input
                    type="email"
                    placeholder="Email"
                    icon={faEnvelope}
                    className='mb-3'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Application.Input
                    type="password"
                    placeholder="Senha"
                    icon={faKey}
                    className='mb-3'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="d-flex justify-content-between mb-3">
                    <a href="#" className="application-text-primary" onClick={handleForgotPassword}>Esqueceu a senha?</a>
                </div>
                <Application.Button
                    className='button-login login-btn mt-4'
                    loader={loader}
                    text="ENTRAR"
                    type="submit"
                    icon={faArrowRightToBracket}
                />
            </Form>
        </div>
    );
};

export default LoginForm;