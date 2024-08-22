import React, { useState } from 'react';
import { Navbar, Nav, Offcanvas, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css'; // Adicione um arquivo CSS
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import NotificationOffCanvas from '../../specific/NotificationOffCanvas';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import SearchOffCanvas from '../../specific/SearchOffCanvas';

const NavbarMobile = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await api.post('logout');
      localStorage.removeItem('token');
      navigate('/')
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const handleShowMenu = () => setShowMenu(true);
  const handleCloseMenu = () => setShowMenu(false);

  return (
    <Navbar expand={false} style={{ backgroundColor: '#fff' }}>
      <Container fluid>
        <Navbar.Brand href="#"><img src={process.env.PUBLIC_URL + "/assets/images/logo.png"} alt="logo scraper" style={{ width: '120px' }} /></Navbar.Brand>
        <div className="d-flex align-items-center">
          <SearchOffCanvas />
          <NotificationOffCanvas />
          <Button variant="light" className="navbar-toggler-custom" onClick={handleShowMenu}>
            <FontAwesomeIcon icon={faBars} />
          </Button>
        </div>
        <Offcanvas
          show={showMenu}
          onHide={handleCloseMenu}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          style={{ backgroundColor: '#0077B5', color: '#fff', width: '414px' }}
        >
          <Offcanvas.Header closeButton closeVariant="white">
            <Offcanvas.Title id="offcanvasNavbarLabel">
              <img src={process.env.PUBLIC_URL + "/assets/images/white-logo.png"} alt="logo scraper" style={{ width: '120px' }} />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-center flex-grow-1 pe-3">
              <Nav.Link href="#action1" style={{ color: '#fff', textAlign: 'center', fontSize: '1.25rem' }}>Meu Perfil</Nav.Link>
              <Nav.Link href="#action2" style={{ color: '#fff', textAlign: 'center', fontSize: '1.25rem' }}>Configurações</Nav.Link>
              <Nav.Link onClick={handleLogout} style={{ color: '#fff', textAlign: 'center', fontSize: '1.25rem' }}>Sair</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavbarMobile;