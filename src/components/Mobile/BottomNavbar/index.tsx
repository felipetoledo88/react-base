import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faUserFriends, faPlus, faBorderAll } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots as farCommentDots } from '@fortawesome/free-regular-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import './style.css';

const BottomNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();



  return (
    <Navbar fixed="bottom" className="bottom-navbar justify-content-around">
      <Nav className="justify-content-between w-100">
        <Nav.Link 
          onClick={() => navigate('/messages')} 
          className={`d-flex flex-column align-items-center ${location.pathname === '/messages' ? 'active' : ''}`}
        >
          <FontAwesomeIcon icon={farCommentDots} size="lg" />
          <span>Mensagens</span>
        </Nav.Link>
        <Nav.Link 
          onClick={() => navigate('/panel')} 
          className={`d-flex flex-column align-items-center ${location.pathname === '/panel' ? 'active' : ''}`}
        >
          <FontAwesomeIcon icon={faBorderAll} size="lg" />
          <span>Painel</span>
        </Nav.Link>
        <Nav.Link className="d-flex flex-column align-items-center">
          <div className="plus-icon">
            <FontAwesomeIcon icon={faPlus} size="lg" />
          </div>
        </Nav.Link>
        <Nav.Link 
          onClick={() => navigate('/analyses')} 
          className={`d-flex flex-column align-items-center ${location.pathname === '/analyses' ? 'active' : ''}`}
        >
          <FontAwesomeIcon icon={faChartLine} size="lg" />
          <span>Análises</span>
        </Nav.Link>
        <Nav.Link 
          onClick={() => navigate('/persona')} 
          className={`d-flex flex-column align-items-center ${location.pathname === '/persona' ? 'active' : ''}`}
        >
          <FontAwesomeIcon icon={faUserFriends} size="lg" />
          <span>Persona</span>
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default BottomNavbar;