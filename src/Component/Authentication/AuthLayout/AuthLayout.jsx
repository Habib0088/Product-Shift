import React from "react";
import { Link, Outlet } from "react-router";
import Logo from "../../Logo/Logo";
import deliveryPhoto from "../../../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div>
      <div>
        <Link to='/'><Logo></Logo></Link>
      </div >
      {/* container */}
      <div className="mt-7 flex w-11/12 mx-auto">
        <div className="flex-1 text-center">
          <Outlet></Outlet>
        </div >
        {/* Non changale part */}
        <div className="flex-1">
          <img src={deliveryPhoto} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
