import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import { BsShieldSlashFill } from "react-icons/bs";
import { FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { isLoading,refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleRoleChange = (user, newRole) => {
    if (user.role === newRole) return; // do nothing if same role
    Swal.fire({
      title: `Change role of ${user.displayName} to ${newRole}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/user/${user._id}`, { role: newRole })
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire({
                icon: "success",
                title: "Role Updated",
                text: `${user.displayName} is now ${newRole}`,
                timer: 1500,
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

  const roleColors = {
    admin: "bg-green-100 text-green-700",
    rider: "bg-blue-100 text-blue-700",
    user: "bg-gray-100 text-gray-700",
  };
if(isLoading){
  return <LoadingSpinner></LoadingSpinner>
}
  return (
    <div className="w-11/12 mx-auto my-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Users Management ({users.length})
        </h1>
        <p className="text-gray-500 mt-2">
          View all users and manage roles. Change roles using the dropdown.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
        <table className="min-w-full table-auto text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Change Role</th>
              
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user?.photoURL}
                          alt="Avatar"
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">
                        {user.displayName}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">{user?.email}</td>
                <td className="px-4 py-3 text-gray-700 font-medium">{user?.role}</td>

                {/* Role Dropdown */}
                <td className="px-4 py-3">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user, e.target.value)}
                    className={`px-3 py-1 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 ${roleColors[user.role]}`}
                  >
                    <option
                      value="admin"
                      className={user.role === "admin" ? roleColors.admin : ""}
                    >
                      Admin
                    </option>
                    <option
                      value="rider"
                      className={user.role === "rider" ? roleColors.rider : ""}
                    >
                      Rider
                    </option>
                    <option
                      value="user"
                      className={user.role === "user" ? roleColors.user : ""}
                    >
                      User
                    </option>
                  </select>
                </td>

             
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {users.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No users found.
        </div>
      )}
    </div>
  );
};

export default UsersManagement;
