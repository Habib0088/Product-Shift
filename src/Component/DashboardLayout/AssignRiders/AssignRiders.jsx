import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const AssignRiders = () => {
  const [selectedParcel, setSelectedParcel] = useState(null);
  const refModal = useRef();
  const axiosSecure = useAxiosSecure();

  const {
    isLoading,
    refetch: refetchParcels,
    data: parcels = [],
  } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=pending-pickup"
      );
      return res.data;
    },
  });

  // const { refetch: refetchRiders, data: riders = [] } = useQuery({
  //   queryKey: ["parcels", selectedParcel?.senderDistrict, "available"],
  //   enabled: !!selectedParcel,
  //   queryFn: async () => {
  //     const res = await axiosSecure.get(
  //       `/riders?status=approved&district=${selectedParcel.senderDistrict}&workStatus=available`
  //     );
  //     return res.data;
  //   },
  // });
  const { refetch: refetchRiders, data: riders = [] } = useQuery({
  queryKey: ["availableRiders", selectedParcel?.senderDistrict],
  enabled: !!selectedParcel,
  queryFn: async () => {
    if (!selectedParcel) return [];
    const res = await axiosSecure.get(
      `/riders?status=approved&district=${selectedParcel.senderDistrict}&workStatus=available`
    );
    return res.data;
  },
});


  const handleAssignModal = (parcel) => {
    setSelectedParcel(parcel);
    refModal.current.showModal();
  };

  const handleAssignRider = (rider) => {
    const riderAssignInfo = {
      riderId: rider._id,
      riderName: rider.name,
      riderEmail: rider.email,
      parcelId: selectedParcel._id,
      trackingId: selectedParcel.trackingId,
    };
    axiosSecure
      .patch(`/parcels/${selectedParcel._id}`, riderAssignInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetchParcels();
          refetchRiders();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Rider has been assigned",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-11/12 mx-auto my-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Assign Riders ({parcels.length})
        </h1>
        <p className="text-gray-500 mt-2">
          Assign available riders to pending parcels quickly and efficiently.
        </p>
      </div>

      {/* Parcels Table */}
      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
        <table className="min-w-full table-auto text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Parcel Name</th>
              <th className="px-4 py-3">Cost</th>
              <th className="px-4 py-3">Created At</th>
              <th className="px-4 py-3">Pickup District</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {parcels.map((parcel, index) => (
              <tr key={parcel._id} className="hover:bg-gray-50 transition-all">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 font-medium text-gray-800">
                  {parcel.name}
                </td>
                <td className="px-4 py-3 text-gray-600">{parcel.cost}</td>
                <td className="px-4 py-3 text-gray-600">{parcel.createdAt}</td>
                <td className="px-4 py-3 text-gray-700 font-medium">
                  {parcel.senderDistrict}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleAssignModal(parcel)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Assign Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Assigning Riders */}
      <dialog ref={refModal} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box p-6">
          <h3 className="font-bold text-xl mb-4">
            Available Riders ({riders.length})
          </h3>

          {riders.length === 0 ? (
            <p className="text-gray-500">
              No available riders in this district.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto text-left table-zebra">
                <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                  <tr>
                    <th className="px-4 py-2">#</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {riders.map((rider, index) => (
                    <tr
                      key={rider._id}
                      className="hover:bg-gray-50 transition-all"
                    >
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2 font-medium text-gray-800">
                        {rider.name}
                      </td>
                      <td className="px-4 py-2 text-gray-600">{rider.email}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleAssignRider(rider)}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRiders;
