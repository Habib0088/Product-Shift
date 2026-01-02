import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { NavLink, Outlet } from "react-router";
import { FaRegCreditCard, FaTasks, FaUser } from "react-icons/fa";
import { RiEBike2Fill, RiEBikeFill, RiTaskFill } from "react-icons/ri";
import { FaUsersGear } from "react-icons/fa6";
import useRole from "../../../hook/useRole";
import useAuth from "../../../hook/useAuth";



const DashboardLayout = () => {
  const {role}=useRole()
  const {user}=useAuth()
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4">Navbar Title</div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
   


<div className="mb-6 flex flex-col items-center mt-3">
  <div
    className="rounded-full bg-gray-300 mb-2 shadow-inner overflow-hidden 
               w-20 h-20 is-drawer-close:w-10 is-drawer-close:h-10 transition-all duration-300"
  >
    <img
      className="rounded-full w-full h-full object-cover"
      src={user?.photoURL}
      alt=""
    />
  </div>

  {/* Name & Role: only visible when sidebar is open */}
  <h3 className="font-semibold text-lg is-drawer-close:hidden">{user?.displayName}</h3>
  <p className="text-sm text-gray-500 is-drawer-close:hidden">{role}</p>
</div>

            {/* ======================profile */}
            {/* List item */}
            
            <li>
              <NavLink to="/">
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage"
                >
                  {/* Home icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="m-1.5 inline-block size-4"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  </svg>
                  <span className="is-drawer-close:hidden">Homepage</span>
                </button>
              </NavLink>
            </li>
 
            {/* List item */}

            <li>
              <NavLink to="/dashboard/myParcel">
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="My Parcel"
                >
                  <CiDeliveryTruck className="m-1.5 inline-block size-4" />
                  <span className="is-drawer-close:hidden">My Parcel</span>
                </button>
              </NavLink>
            </li>

          {/* Rider dashboard links */}
          {
            role==="rider" && <>
              <li>
              <NavLink to="/dashboard/assignDeliveries">
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Assign Deliveries"
                >
                  <FaTasks className="m-1.5 inline-block size-4" />

         

                  {/* <CiDeliveryTruck  /> */}
                  <span className="is-drawer-close:hidden">Assign Deliveries</span>
                </button>
              </NavLink>
              </li>
              <li>
              <NavLink to="/dashboard/completedDeliveries">
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Completed Deliveries"
                >
                  {/* <FaTasks  /> */}
                <RiTaskFill className="m-1.5 inline-block size-4" />

         

                  {/* <CiDeliveryTruck  /> */}
                  <span className="is-drawer-close:hidden">Completed Deliveries</span>
                </button>
              </NavLink>
              </li>
            </>
          }
            {/* Admin dashboard links */}
           {
            role==='admin'&&<>
             <li>
              <NavLink to="/dashboard/approveRiders">
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Approve Riders"
                >
                  <RiEBike2Fill className="m-1.5 inline-block size-4" />

                  {/* <CiDeliveryTruck  /> */}
                  <span className="is-drawer-close:hidden">Approve Riders</span>
                </button>
              </NavLink>
              </li>
              <li>
              <NavLink to="/dashboard/usersManagement">
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Users Management"
                >
               
                  <FaUsersGear  className="m-1.5 inline-block size-4" />


                  {/* <CiDeliveryTruck  /> */}
                  <span className="is-drawer-close:hidden">Users Management</span>
                </button>
              </NavLink>
            </li>
              <li>
              <NavLink to="/dashboard/assignRiders">
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Assign Riders"
                >
               <RiEBikeFill  className="m-1.5 inline-block size-4"/>

                  {/* <FaUsersGear   /> */}


                  {/* <CiDeliveryTruck  /> */}
                  <span className="is-drawer-close:hidden">Assign Riders</span>
                </button>
              </NavLink>
            </li>

            </>


           }
          
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
