import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import { FaRegTrashAlt, FaUserCheck, FaUserSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();

  const {isLoading, refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", status],
    queryFn: async () => {
      const result = await axiosSecure.get("/riders");
      return result.data;
    },
  });
  console.log(riders);

  // Delete Rider
  const handleDelete = (rider) => {
    Swal.fire({
      title: `<strong>Delete <u>${rider.name}</u>?</strong>`,
      html: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      focusCancel: true,
      customClass: {
        popup: "shadow-xl rounded-xl border border-gray-300",
        confirmButton: "bg-red-600 hover:bg-red-700 text-white",
        cancelButton: "bg-gray-200 hover:bg-gray-300 text-gray-800",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/riders/${rider._id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: `${rider.name} has been removed.`,
              timer: 1800,
              showConfirmButton: false,
              toast: true,
              position: "top-end",
            });
          }
        });
      }
    });
  };

  // Approve / Reject with confirmation
  const handleActionWithConfirm = (rider, status) => {
    Swal.fire({
      title: `Are you sure?`,
      html: `Do you want to <strong>${status}</strong> <u>${rider.name}</u>?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes, ${status}!`,
      cancelButtonText: "Cancel",
      reverseButtons: true,
      focusCancel: true,
      customClass: {
        popup: "shadow-xl rounded-xl border border-gray-300",
        confirmButton:
          status === "approved"
            ? "bg-green-600 hover:bg-green-700 text-white"
            : "bg-yellow-600 hover:bg-yellow-700 text-white",
        cancelButton: "bg-gray-200 hover:bg-gray-300 text-gray-800",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const info = { status, email: rider.email };
        axiosSecure
          .patch(`/riders/${rider._id}`, info)
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire({
                icon: "success",
                title:
                  status === "approved" ? "Rider Approved" : "Rider Rejected",
                text: `${rider.name} is now ${status.toLowerCase()}.`,
                timer: 1800,
                showConfirmButton: false,
                toast: true,
                position: "top-end",
              });
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const handleApprove = (rider) => handleActionWithConfirm(rider, "approved");
  const handleReject = (rider) => handleActionWithConfirm(rider, "Rejected");
if(isLoading){
  return <LoadingSpinner></LoadingSpinner>
}
  return (
    <div className="w-11/12 mx-auto my-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Riders Pending Approval ({riders.length})
        </h1>
        <p className="text-gray-500 mt-2">
          Review and manage rider applications. Approve, reject, or remove
          riders easily.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
        <table className="table-auto w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Rider Status</th>
              <th className="px-4 py-3">Region</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr
                key={rider._id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 font-medium">{rider?.name}</td>

                <td className="px-4 py-3 text-gray-600">{rider?.email}</td>
                <td className="px-4 py-3 text-gray-700">{rider?.status}</td>
                <td className="px-4 py-3 text-gray-700">
                  {rider?.region} ({rider?.address})
                </td>
                <td className="px-4 py-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleApprove(rider)}
                    className="flex items-center justify-center px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
                    title="Approve Rider"
                  >
                    <FaUserCheck />
                  </button>
                  <button
                    onClick={() => handleReject(rider)}
                    className="flex items-center justify-center px-3 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition"
                    title="Reject Rider"
                  >
                    <FaUserSlash />
                  </button>
                  <button
                    onClick={() => handleDelete(rider)}
                    className="flex items-center justify-center px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                    title="Delete Rider"
                  >
                    <FaRegTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {riders.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No pending riders found.
        </div>
      )}
    </div>
  );
};

export default ApproveRiders;
