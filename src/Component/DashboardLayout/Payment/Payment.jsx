import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";

const Payment = () => {
  const { id } = useParams();
  console.log(id);

  const axiosSecure = useAxiosSecure();

  const { data: parcel } = useQuery({
    queryKey: ["parcel", id],
    queryFn: async () => {
      const res = await axiosSecure(`/parcels/${id}`);
      console.log(res.data);

      return res.data;
    },
  });
  const handlePayment = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelName: parcel.name,
      parcelId: parcel._id,
      // parcelEmail:parcel.senderEmail
      senderEmail: parcel.senderEmail,
    };
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  };
  // console.log(parcel);
  return (
    <div className="w-2/5 mx-auto ">
      <h1>{parcel?.name}</h1>
      <h2>Price: {parcel?.cost}</h2>
      <button onClick={handlePayment} disabled={parcel?.paid} className="btn bg-primary">
        Pay
      </button>
    </div>
  );
};

export default Payment;
