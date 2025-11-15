import React from 'react';
import NavBar from '../Pages/Shared/NavBar/NavBar';
import { Outlet } from 'react-router';
import Footer from '../Pages/Shared/Footer/Footer';

const Layout = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Layout;