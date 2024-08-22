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
            <Button className="scraper-bg-primary me-2">
                <FontAwesomeIcon icon={faPlus} className="me-1" /> Novo Chat
            </Button>
            <Dropdown align="end" className="me-2">
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                    <img
                        src={"https://scraperapi-homol.swiftsoft.online/images/profile/04769ddff1af0402ebc91dd8390666d5.png"}  // Use the appropriate path to your profile image
                        alt="profile"
                        className="rounded-circle me-2"
                        style={{ width: '30px' }}
                    />
                    Meu Perfil
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <NotificationOffCanvas /> 
        </Navbar>
    );
};

export default CustomNavbar;
