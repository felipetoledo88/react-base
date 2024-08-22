import React from 'react';
import NavbarMobile from '../../Mobile/Navbar';
import BottomNavbar from '../BottomNavbar';

const Main = ({ children }:any) => {
    return (
        <div className="d-flex">
            <div className="flex-grow-1">
                <NavbarMobile />
                <div className="content p-4" style={{ height: '100svh'}}>
                    {children}
                </div>
                <BottomNavbar />
                </div>
        </div>
    );
};

export default Main;
