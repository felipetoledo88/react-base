import React from 'react';
import NavbarMobile from '../../Mobile/Navbar';
import Sidebar from '../Sidebar';
import CustomNavbar from '../Navbar';
import BottomNavbar from '../../Mobile/BottomNavbar';
import useWindowSize from '../../../hooks/UseWindowSize';

const Main = ({ children }:any) => {
  const { width } = useWindowSize();

  if (width >= 992) {
    // Componente para desktop
    return (
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1">
          <CustomNavbar />
          <div className="content p-4" style={{ border: '1px solid #dee2e6', borderRight: 'none', minHeight: '100svh', borderRadius: '15px 0 0 0' }}>
            {children}
          </div>
        </div>
      </div>
    );
  } else {
    // Componente para mobile
    return (
      <div className="d-flex">
        <div className="flex-grow-1">
          <NavbarMobile />
          <div className="content p-4" style={{ height: 'calc(100svh' }}>
            {children}
          </div>
          <BottomNavbar />
        </div>
      </div>
    );
  }
};

export default Main;
