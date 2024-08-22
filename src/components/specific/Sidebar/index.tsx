import React from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import './style.css'; // Make sure to create and import a CSS file for custom styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faCog, faEnvelope, faSignOutAlt, faTableColumns, faUser } from '@fortawesome/free-solid-svg-icons';
import api from '../../../services/api';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        try {
            await api.post('logout');
            localStorage.removeItem('token');
            navigate('/');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    return (
        <div className="d-flex flex-column vh-100 sidebar" style={{ width: '250px' }}>
            <div className="d-flex align-items-center justify-content-start m-4">
                <img src={process.env.PUBLIC_URL + "/assets/images/logo.svg"} alt="logo application" className="logo" /> {/* Use the appropriate path to your logo */}
            </div>
            <Nav defaultActiveKey="/panel" className="flex-column flex-grow-1">
                <Nav.Link
                    onClick={() => navigate('/panel')}
                    className={`nav-link ${location.pathname === '/panel' ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faTableColumns} className="me-2" /> Painel
                </Nav.Link>
                <Nav.Link
                    onClick={() => navigate('/analyses')}
                    className={`nav-link ${location.pathname === '/analyses' ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faChartLine} className="me-2" /> Análises
                </Nav.Link>
                <Nav.Link
                    onClick={() => navigate('/messages')}
                    className={`nav-link ${location.pathname === '/messages' ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faEnvelope} className="me-2" /> Mensagens
                </Nav.Link>
                <Nav.Link
                    onClick={() => navigate('/persona')}
                    className={`nav-link ${location.pathname === '/persona' ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faUser} className="me-2" /> Persona
                </Nav.Link>
                <div className="mt-auto">
                    <Nav.Link
                        onClick={() => navigate('/settings')}
                        className={`nav-link ${location.pathname === '/settings' ? 'active' : ''}`}>
                        <FontAwesomeIcon icon={faCog} className="me-2" /> Configurações
                    </Nav.Link>
                    <Nav.Link onClick={handleLogout}>
                        <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Sair
                    </Nav.Link>
                </div>
            </Nav>
        </div>
    );
};

export default Sidebar;