import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import { BsShieldSlashFill } from "react-icons/bs";
import { FaUserShield } from "react-icons/fa";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  const handleAddAdmin = (user) => {
    const userInfo = {
      role: "admin",
    };
    axiosSecure
      .patch(`/user/${user._id}`, userInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
        }

        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  const handleAddUser=(user)=>{
    const userInfo={
        role:'user'
    }
    axiosSecure.patch(`/user/${user._id}`,userInfo).then(res=>{
        console.log(res.data);
        if(res.data.modifiedCount){
            refetch()
        }
    }).catch(err=>console.log(err.message)
    )

  }
  return (
    <div>
      <h1>Users : {users.length}</h1>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Action</th>
              <th>Other Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user?.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {user?.email}
                  <br />
                </td>
                <td>
                  {user?.role}
                  <br />
                </td>
                <td >
                  {/* Here */}
                  {user.role === "admin" ? (
                    <button onClick={()=>handleAddUser(user)} className="btn bg-red-400">
                      
                      <BsShieldSlashFill />
                    </button>
                  ) : (
                    <button
                      className="bg-green-400 btn"
                      onClick={() => handleAddAdmin(user)}
                    >
                      <FaUserShield />
                    </button>
                  )}
                </td>
                <th>
                  <button className="btn ">details</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
