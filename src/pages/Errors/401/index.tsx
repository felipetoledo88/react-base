// Unauthorized.jsx
import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100">
            <h1>401 - Não autorizado</h1>
            <p>Você não tem permissão para acessar esta página.</p>
            <Button variant="primary" onClick={() => navigate('/')}>Voltar para a Home</Button>
        </div>
    );
};

export default Unauthorized;
