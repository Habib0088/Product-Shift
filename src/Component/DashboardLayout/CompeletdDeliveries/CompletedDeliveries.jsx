import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import useAuth from "../../../hook/useAuth";

const CompletedDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: parcels = [] } = useQuery({
    queryKey: ["delivered"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcelsDelivered?email=${user.email}&deliveryStatus=delivered`
      );
      return res.data;
    },
  });
  console.log(parcels);
  const calculatePayout = (parcel) => {
    if (parcel.senderDistrict === parcel.receiverDistrict) {
      const cost = parcel.cost * 0.8;
      return cost;
    }
    else{
        const cost=parcel.cost*0.6;
        return cost
    }
  };
  return (
    <div>
      <h1 className="text-3xl">Completed Deliveries: {parcels.length}</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Created At</th>
              <th>Pickup District</th>
              <th>Cost</th>
              <th>Payout</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, i) => (
              <tr>
                <th>{i + 1}</th>
                <td>{parcel.name}</td>
                <td>{parcel.createdAt}</td>
                <td>{parcel.senderDistrict}</td>
                <td>{parcel.cost}</td>
                <td>{ calculatePayout(parcel)}</td>
                <td>
                  <button className="btn btn-primary text-black">
                    Cashout
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedDeliveries;
