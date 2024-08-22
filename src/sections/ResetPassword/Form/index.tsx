import React, { useState } from 'react';
import { Alert, Form } from 'react-bootstrap';
import { faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Scraper from '../../../components/common/Scraper';
import { toast } from 'react-toastify';
import api from '../../../services/api';

const ResetPasswordForm: React.FC = () => {
    const [loader, setLoader] = useState(false);
    const [email, setEmail] = useState('');

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoader(true);

        try {
            const response = await api.post('/recover-token', { email });
            setLoader(false);
            toast.success('Um link de redefinição de senha foi enviado para o seu email, por favor, verifique sua caixa de entrada.');
        } catch (error) {
            setLoader(false);
            console.error('Erro ao enviar o link de redefinição de senha:', error);
            toast.error('Erro ao enviar o link de redefinição de senha. Por favor, tente novamente.');
        }
    };

    return (
        <div className="bg-white p-5 shadow-lg w-100 reset-password-form-container" style={{ maxWidth: '400px', borderRadius: '15px' }}>
            <img className='mb-4' src={process.env.PUBLIC_URL + "/assets/images/logo.png"} alt="scraper logo" style={{ width: '160px', margin: '0 auto', display: 'block' }} />
            <Form className='pt-4' onSubmit={handleResetPassword}>
                <Alert variant="info" className="mb-3">
                    Identifique-se para receber um e-mail com as instruções e o link para criar uma nova senha.
                </Alert>
                <Scraper.Input
                    type="email"
                    placeholder="Email"
                    icon={faEnvelope}
                    className='reset-password-input mb-3'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Scraper.Button
                    className='scraper-bg-primary reset-password-btn mt-4'
                    loader={loader}
                    text="ENVIAR LINK"
                    type="submit"
                    icon={faPaperPlane}
                />
            </Form>
        </div>
    );
};

export default ResetPasswordForm;