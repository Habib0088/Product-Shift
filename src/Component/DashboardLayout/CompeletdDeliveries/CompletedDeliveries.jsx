import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import useAuth from "../../../hook/useAuth";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const CompletedDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["delivered", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcelsDelivered?email=${user?.email}&deliveryStatus=delivered`
      );
      return res.data;
    },
  });

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const formatMoney = (v) => Number(v || 0).toFixed(2);

  const calculatePayout = (parcel) => {
    const rate =
      parcel.senderDistrict === parcel.receiverDistrict ? 0.8 : 0.6;
    return parcel.cost * rate;
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">
        Completed Deliveries:{" "}
        <span className="text-primary font-bold">{parcels.length}</span>
      </h1>

      <div className="overflow-x-auto rounded-xl shadow-sm ">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Delivered On</th>
              <th>Pickup District</th>
              <th>Cost</th>
              <th>Payout</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {parcels.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 font-bold">
                  No completed deliveries yet.
                </td>
              </tr>
            )}

            {parcels.map((parcel, i) => {
              const payout = calculatePayout(parcel);

              return (
                <tr key={parcel._id}>
                  <td>{i + 1}</td>

                  <td className="font-medium">{parcel.name}</td>

                  <td>{formatDate(parcel.createdAt)}</td>

                  <td>{parcel.senderDistrict}</td>

                  <td>৳ {formatMoney(parcel.cost)}</td>

                  <td>
                    <span className="badge badge-success badge-outline">
                      ৳ {formatMoney(payout)}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-sm btn-primary text-black"
                      disabled={parcel?.cashoutRequested}
                    >
                      {parcel?.cashoutRequested ? "Requested" : "Cashout"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedDeliveries;
