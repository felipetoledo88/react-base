import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import './style.css';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found-container d-flex flex-column align-items-center justify-content-center vh-100 text-center">
            <FontAwesomeIcon icon={faExclamationTriangle} size="4x" className="mb-4 text-warning" />
            <h1 className="display-4">404 - Página não encontrada</h1>
            <p className="lead">A página que você está procurando não existe ou foi removida.</p>
            <Button variant="primary" className="application-bg-primary" onClick={() => navigate('/panel')}>Voltar</Button>
        </div>
    );
};

export default NotFound;
