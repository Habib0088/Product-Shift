import Swal from "sweetalert2";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaSearch, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router";

const MyParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
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
            console.log(res.data);

            // check backend delete success
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your item has been deleted.", "success");

              // refresh the list
              refetch();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <div>
      <h1 className="text-center font-bold text-2xl my-5">
        This is my parcel {parcels.length}
      </h1>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Delivery Status</th>
              <th>Action</th>
            </tr>
          </thead>

          {parcels.map((parcel, index) => (
            <tbody key={parcel._id}>
              <tr>
                <th>{index + 1}</th>
                <td>{parcel?.name}</td>
                <td>{parcel?.cost}</td>
                <Link to={`/dashboard/payment/${parcel._id}`}><td><button className="btn btn-primary text-black">{parcel.paymentStatus==="unpaid"?<span>Pay</span>:<span className="text-green-400">Paid</span>
                }</button></td></Link>
                <td></td>
                <td>
                  <button className="btn mr-2 hover:bg-gray-300">
                    <FaSearch />
                  </button>
                  <button className="btn mr-2 hover:bg-gray-300">
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="btn mr-2 hover:bg-gray-300"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default MyParcel;
