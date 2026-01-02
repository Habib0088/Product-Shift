import Swal from "sweetalert2";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaSearch, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const MyParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {isLoading,data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/parcels/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your item has been deleted.", "success");
              refetch();
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };
  if(isLoading){
    return <LoadingSpinner></LoadingSpinner>
  }

  return (
    <div className="w-11/12 mx-auto my-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          My Parcels ({parcels.length})
        </h1>
        <p className="text-gray-500 text-lg">
          Manage your parcels, check payment status, and track your shipments easily.
        </p>
      </div>

      {/* Table container */}
      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
        <table className="table w-full border-collapse text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Cost</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Delivery Status</th>
              <th className="px-4 py-3">Tracking ID</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr
                key={parcel._id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-all"
              >
                <th className="px-4 py-3">{index + 1}</th>
                <td className="px-4 py-3">{parcel?.name}</td>
                <td className="px-4 py-3">${parcel?.cost}</td>
                <td className="px-4 py-3">
                  <Link to={`/dashboard/payment/${parcel._id}`}>
                    <button
                      className={`px-3 py-1 rounded text-sm font-medium border ${
                        parcel.paymentStatus === "unpaid"
                          ? "border-gray-400 text-gray-700"
                          : "border-gray-400 text-gray-500"
                      }`}
                    >
                      {parcel.paymentStatus === "unpaid" ? "Pay" : "Paid"}
                    </button>
                  </Link>
                </td>
                <td className="px-4 py-3">{parcel?.deliveryStatus}</td>
                <td className="px-4 py-3">
                  <Link
                    to={`/trackingParcel/${parcel.trackingId}`}
                    className="text-gray-600 underline hover:text-gray-800"
                  >
                    {parcel?.trackingId}
                  </Link>
                </td>
                <td className="px-4 py-3 flex gap-2">
                  {/* <button className="px-2 py-1 border rounded text-gray-600 hover:bg-gray-200 transition">
                    <FaSearch />
                  </button> */}
                  <button className="px-2 py-1 border rounded text-gray-600 hover:bg-gray-200 transition">
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="px-2 py-1 border rounded text-gray-600 hover:bg-gray-200 transition"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {parcels.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No parcels found. Start by adding your first parcel.
        </div>
      )}
    </div>
  );
};

export default MyParcel;
