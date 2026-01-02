import React, { use } from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import logo from '../../../assets/service.png'

const Service = ({ serviceResponse }) => {
  const serviceData = use(serviceResponse);


  return (
    <div className="bg-acent py-12 mx-2 rounded-md">
      <div className="text-center w-11/12 mx-auto">
        <h1 className="font-bold text-2xl ">Our Services</h1>
        <p className=" md:w-6/12 mx-auto my-3">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
         {
            serviceData.map(service=> <div className="transition duration-500 bg-white space-y-4 shadow-2xl p-3 h-full rounded-md text-center">
            {/* <CiDeliveryTruck className="text-4xl  mx-auto" /> */}
            <img className="mx-auto hover:scale-110" src={logo} alt="" />
            <h3 className="font-semibold text-secondary">
              {service.title}
            </h3>
            <p>
             {service.description}
            </p>
          </div>)
         }
        </div>
      </div>
    </div>
  );
};

export default Service;
