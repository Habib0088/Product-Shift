import { Query, useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import { FaRegTrashAlt, FaUserCheck, FaUserSlash } from "react-icons/fa";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch,data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const result = await axiosSecure.get("/riders");
      return result.data;
    },
  });
   const updateRider=(id,status)=>{
    const info = {
      status: status,
    };
    axiosSecure.patch(`/riders/${id}`, info).then(res=>{
        console.log(res.data);
        refetch()
        
    }).catch(err=>console.log(err)
    )
  }
  const handleApprove = (id) => {
    // console.log(id);
    updateRider(id,'approved')
    
  };
  const handleReject=(id)=>{
    // console.log();
    updateRider(id,'Refected')
    
  }
 
  return (
    <div>
      <h1 className="text-4xl font-bold">
        Riders on Pending : {riders.length}
      </h1>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>NO</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.status}</td>
                <td>
                  <button
                    onClick={() => handleApprove(rider._id)}
                    className="btn m-1"
                  >
                    <FaUserCheck />
                  </button>
                  <button onClick={()=>handleReject(rider._id)} className="btn m-1">
                    <FaUserSlash />
                  </button>
                  <button className="btn m-1">
                    <FaRegTrashAlt />
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

export default ApproveRiders;
