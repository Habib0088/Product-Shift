import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import useAuth from "../../../hook/useAuth";

const CompletedDeliveries = () => {
    const axiosSecure=useAxiosSecure()
    const {user}=useAuth()
  const {data:parcels=[]} = useQuery({
    queryKey: ['delivered'],
    queryFn:async()=>{
        const res = await axiosSecure.get(
      `/parcelsDelivered?email=${user.email}&deliveryStatus=delivered`
    );
    return res.data
    }
});
  return (
    <div>
      <h1 className="text-3xl">Completed Deliveries: {parcels.length}</h1>
    </div>
  );
};

export default CompletedDeliveries;
