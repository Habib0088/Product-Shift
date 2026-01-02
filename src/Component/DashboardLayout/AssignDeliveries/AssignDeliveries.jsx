import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";

const AssignDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { refetch, data: parcels = [], isLoading } = useQuery({
    queryKey: ["parcels", user?.email, "driver-assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=delivery-assigned`
      );
      return res.data;
    },
  });

  const handleUpdateStatus = async (parcel, status) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `You want to mark this parcel as "${status}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, continue",
    });

    if (!confirm.isConfirmed) return;

    const statusInfo = {
      trackingId: parcel.trackingId,
      deliveryStatus: status,
      riderId: parcel.riderId,
    };

    const res = await axiosSecure.patch(
      `/parcels/${parcel._id}/status`,
      statusInfo
    );

    if (res.data.modifiedCount) {
      refetch();
      Swal.fire({
        icon: "success",
        title: "Updated successfully!",
        timer: 1400,
        showConfirmButton: false,
      });
    }
  };

  if (isLoading) return <p className="text-center mt-6">Loading…</p>;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">
        Assigned Deliveries:{" "}
        <span className="text-primary font-bold">{parcels.length}</span>
      </h1>

      <div className="overflow-x-auto rounded-xl shadow-sm ">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {parcels.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 font-bold">
                  No deliveries assigned yet.
                </td>
              </tr>
            )}

            {parcels.map((parcel, i) => (
              <tr key={parcel._id}>
                <td>{i + 1}</td>

                <td className="font-medium">{parcel.name}</td>

                <td>
                  {parcel.deliveryStatus === "Rider accepted" ? (
                    <span className="badge badge-success badge-outline">
                      Accepted
                    </span>
                  ) : (
                    <span className="badge badge-warning badge-outline">
                      Pending
                    </span>
                  )}
                </td>

                <td className="flex flex-wrap gap-2">
                  {parcel.deliveryStatus !== "Rider accepted" && (
                    <>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() =>
                          handleUpdateStatus(parcel, "Rider accepted")
                        }
                      >
                        Accept
                      </button>

                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => handleUpdateStatus(parcel, "reject")}
                      >
                        Reject
                      </button>
                    </>
                  )}

                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleUpdateStatus(parcel, "pickedUp")}
                  >
                    Picked Up
                  </button>

                  <button
                    className="btn btn-sm btn-accent"
                    onClick={() => handleUpdateStatus(parcel, "delivered")}
                  >
                    Delivered
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

export default AssignDeliveries;
