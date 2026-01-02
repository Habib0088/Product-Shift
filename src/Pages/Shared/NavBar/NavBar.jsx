import { Link, NavLink } from "react-router";
import Logo from "../../../Component/Logo/Logo";
import useAuth from "../../../hook/useAuth";
import useRole from "../../../hook/useRole";
import ThemeToggle from "../../../Component/ThemeToogle/Themetoogle";
import { useState, useEffect } from "react";
const NavBar = () => {
  const { user, logOut } = useAuth();
  // const{role}=useRole()
  // console.log(role);

  // console.log(user);

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        // change 100 to whatever offset you want
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => console.log(error));
  };
  const links = (
    <>
      {/* <li>{role}</li> */}
      <li className="font-semibold ">
        <NavLink to="">Home</NavLink>
      </li>
      <li className="font-semibold ">
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
      <li className="font-semibold ">
        <NavLink to="/sendParcel">Send Parcel</NavLink>
      </li>
      <li className="font-semibold ">
        <NavLink to="/rider">Be A Rider</NavLink>
      </li>
      <li className="font-semibold ">
        <NavLink to="/registration">Registration</NavLink>
      </li>

      {user && (
        <>
          <li className="font-semibold ">
            <NavLink to="/dashboard/myParcel">My Parcel</NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div
      className={`bg-gray-200 transition-all duration-300 ${
        isSticky ? "fixed top-0 left-0 w-full shadow-lg z-50" : ""
      }`}
    >
      <div className=" navbar w-11/12 mx-auto z-50 ">
        <div className="navbar-start ">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link>
            <Logo></Logo>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-8">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <button >
              {" "}
              {/* <Link>Log Out</Link> */}
              <li className="relative group">
                <img
                  className="w-[60px] h-[60px] rounded-full"
                  src={user.photoURL}
                  alt=""
                />

                {/* Dropdown menu */}
                <ul className="absolute left-0 mt-2 w-30 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300">
                  <Link to={'/profile'} className="block px-2 font-bold shadow-sm py-2 hover:bg-gray-100 text-start">
                    {user.displayName}
                  </Link>
                  <li
                    className="block px-1 py-1 font-bold hover:bg-gray-100 shadow-sm"
                    onClick={handleLogOut}
                  >
                    LogOut
                  </li>
                  {/* <Link
                    to={"/profile"}
                    className="block px-1 font-bold py-1 hover:bg-gray-100 shadow-sm"
                  >
                    Profile
                  </Link> */}
                </ul>
              </li>
              {/* ==================== */}
            </button>
          ) : (
            <Link className="btn" to="/login">
              Login
            </Link>
          )}
          {/* <button className="btn btn-primary text-black mx-4">
            <Link to="/rider">Be A Rider</Link>
          </button>
         */}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
