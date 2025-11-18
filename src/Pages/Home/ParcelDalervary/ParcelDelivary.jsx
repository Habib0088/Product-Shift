import React from "react";
import liveTracing from "../../../assets/live-tracking.png";

const ParcelDelivary = () => {
  return (
    <div className=" py-7">
      <div className="divider w-11/12 mx-auto"></div>
      <div className="w-11/12 mx-auto bg-white rounded-md p-5 grid grid-cols-12 gap-3 my-4">
        <img className="col-span-3 " src={liveTracing} alt="" />

        <div className="ms-3 col-span-9 flex flex-col items-center justify-center">
          <div>
            <h2 className="text-secondary font-bold text-2xl">
              Live Parcel Tracking
            </h2>
            <p>
              Stay updated in real-time with our live parcel tracking feature.
              From pick-up to delivery, monitor your shipment's journey and get
              instant status updates for complete peace of mind.
            </p>
          </div>
        </div>
      </div>
      <div className="w-11/12 mx-auto bg-white rounded-md p-5 grid grid-cols-12 gap-3 my-4">
        <img className="col-span-3 " src={liveTracing} alt="" />

        <div className="ms-3 col-span-9 flex flex-col items-center justify-center">
          <div>
            <h2 className="text-secondary font-bold text-2xl">
              100% Safe Delivery
            </h2>
            <p>
              We ensure your parcels are handled with the utmost care and
              delivered securely to their destination. Our reliable process
              guarantees safe and damage-free delivery every time.
            </p>
          </div>
        </div>
      </div>
      <div className="w-11/12 mx-auto bg-white rounded-md p-5 grid grid-cols-12 gap-3 my-4">
        <img className="col-span-3 " src={liveTracing} alt="" />

        <div className="ms-3 col-span-9 flex flex-col items-center justify-center">
          <div>
            <h2 className="text-secondary font-bold text-2xl">
              24/7 Call Center Support
            </h2>
            <p>
              Our dedicated support team is available around the clock to assist
              you with any questions, updates, or delivery concerns—anytime you
              need us.
            </p>
          </div>
        </div>
      </div>
           <div className="divider w-11/12 mx-auto"></div>
    </div>
  );
};

export default ParcelDelivary;
