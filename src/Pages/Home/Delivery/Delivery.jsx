import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";

const Delivery = () => {
  return (
    <div>
      <div className="w-11/12 mx-auto  py-10 ">
       <h1  className="text-2xl font-bold mb-5">How It Works</h1>
        <div className="conatiner grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 space-y-2">
           
          <div className=" bg-white shadow-2xl p-3 rounded-md">
            <CiDeliveryTruck className="text-4xl" />
            <h3 className="font-semibold text-secondary">Booking Pick & Drop</h3>
            <p>
              From personal packages to business shipments — we deliver on time,
              every time.
            </p>
          </div>
          <div className="bg-white shadow-2xl p-3 rounded-md">
            <CiDeliveryTruck className="text-4xl" />
            <h3 className="font-semibold text-secondary">Cash On Delivery</h3>
            <p>
              From personal packages to business shipments — we deliver on time,
              every time.
            </p>
          </div>
          <div className=" bg-white shadow-2xl p-3 rounded-md">
            <CiDeliveryTruck className="text-4xl" />
            <h3 className="font-semibold text-secondary">Delivery Hub</h3>
            <p>
              From personal packages to business shipments — we deliver on time,
              every time.
            </p>
          </div>
          <div className=" bg-white shadow-2xl p-3 rounded-md">
            <CiDeliveryTruck className="text-4xl" />
            <h3 className="font-semibold text-secondary">Booking SME & Corporate</h3>
            <p>
              From personal packages to business shipments — we deliver on time,
              every time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
