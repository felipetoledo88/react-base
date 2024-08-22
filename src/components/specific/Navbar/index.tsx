import React from 'react';
import { Navbar, Button, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './style.css'; // Certifique-se de criar e importar um arquivo CSS para estilos personalizados
import NotificationOffCanvas from '../NotificationOffCanvas';
import DropdownSearch from '../../common/DropdownSearch';

const CustomNavbar: React.FC = () => {
    return (
        <Navbar expand="lg" className="custom-navbar">
            <DropdownSearch /> 
            <Button className="button-login me-2">
                <FontAwesomeIcon icon={faPlus} className="me-1" /> Novo Chat
            </Button>
            <NotificationOffCanvas /> 
        </Navbar>
    );
};

export default CustomNavbar;
