import React from 'react';
import logo from "../../assets/logo.png"
const Logo = () => {
    return (
        <div className='flex items-end'>
            <img src={logo} alt="" />
            <h2 className='text-2xl font-semibold -ms-2.5'>Ride Shift</h2>
        </div>
    );
};

export default Logo;