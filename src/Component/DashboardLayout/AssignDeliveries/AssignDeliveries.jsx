import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";

const AssignDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { refetch, data: parcels = [] } = useQuery({
    queryKey: ["parcels", user.email, "driver-assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `parcels/rider?riderEmail=${user.email}&deliveryStatus=delivery-assigned`
      );
      return res.data;
    },
  });
  console.log(parcels);
  
 

  const handleUpdateStatus = (parcel,status) => {
    const statusInfo = {
      trackingId:parcel.trackingId,
      deliveryStatus: status,
      riderId:parcel.riderId
    };
    let message=`The percel is ${status}`
    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  return (
    <div>
      <h1>Assign Deliveries : {parcels.length}</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Confirm</th>
              <th>Pickup Status</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, i) => (
              <tr>
                <th>{i + 1}</th>
                <td>{parcel.name}</td>
                <td>{
                    parcel.deliveryStatus==='Rider accepted'
                    ?<span className="font-bold text-green-500">Accepted</span> 
                    :
                    <>
                    <button onClick={()=>handleUpdateStatus(parcel,'Rider accepted')} className='btn bg-primary text-black'>Accept</button>
                    <button onClick={()=>handleUpdateStatus(parcel,'reject')} className='btn bg-warning text-black ms-3'>Reject</button>
                    </>
                    }</td>
                    {/* Button of last column */}
                <td>
                    <button onClick={()=>handleUpdateStatus(parcel,'pickedUp')}  className="btn btn-primary text-black">PickedUp</button>
                    <button onClick={()=>handleUpdateStatus(parcel,'delivered')} className="btn btn-primary text-black mx-2">Delivered</button>

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
