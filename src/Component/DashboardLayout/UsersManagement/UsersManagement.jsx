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
    const userInfo = { role: "admin" };
    axiosSecure
      .patch(`/user/${user._id}`, userInfo)
      .then((res) => {
        if (res.data.modifiedCount) refetch();
      })
      .catch((err) => console.log(err));
  };

  const handleAddUser = (user) => {
    const userInfo = { role: "user" };
    axiosSecure
      .patch(`/user/${user._id}`, userInfo)
      .then((res) => {
        if (res.data.modifiedCount) refetch();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-11/12 mx-auto my-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Users Management ({users.length})
        </h1>
        <p className="text-gray-500 mt-2">
          View all users and manage roles. Promote or demote users easily.
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
              <th className="px-4 py-3">Admin Action</th>
              <th className="px-4 py-3">Other Action</th>
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
                <td className="px-4 py-3 text-gray-700 font-medium">
                  {user?.role}
                </td>
                <td className="px-4 mt-4 py-3 flex gap-2">
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleAddUser(user)}
                      className="flex items-center justify-center px-3  bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                      title="Demote to User"
                    >
                      <BsShieldSlashFill />
                    </button>
                  ) : (
                    <button
                      className="flex items-center justify-center px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
                      onClick={() => handleAddAdmin(user)}
                      title="Promote to Admin"
                    >
                      <FaUserShield />
                    </button>
                  )}
                </td>
                <td className="px-4 py-3">
                  <button className="btn btn-sm bg-gray-200 hover:bg-gray-300 text-gray-800">
                    Details
                  </button>
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
