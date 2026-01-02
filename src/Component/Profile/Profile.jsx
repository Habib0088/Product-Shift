import { FiMail, FiUser } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { LiaUserSecretSolid } from "react-icons/lia";
import { CiMail } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hook/useAuth";
import useAxiosSecure from "../../hook/useAxiosSecure/useAxiosSecure";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      {profile && (
        <div className="max-w-[600px] w-full bg-white rounded-2xl shadow-2xl p-8 md:p-10 flex flex-col items-center space-y-6 transition-transform ">
          
          {/* Profile Picture */}
          <div className="relative w-[200px] h-[200px]">
            <img
              src={profile?.photoURL || "https://via.placeholder.com/200"}
              alt={profile?.displayName}
              className="w-full h-full hover:scale-105 duration-300 object-cover rounded-full border-4 border-indigo-500 shadow-lg"
            />
            <span className="absolute bottom-2 right-2 bg-indigo-500 text-white p-2 rounded-full shadow-md">
              <FiUser />
            </span>
          </div>

          {/* Name */}
          <h1 className="text-3xl md:text-4xl font-bold flex items-center text-gray-800">
            <span className="mr-3 text-indigo-500">
              <FaRegUser />
            </span>
            {profile?.displayName}
          </h1>

          {/* Role */}
          <h3 className="text-xl md:text-2xl font-semibold flex items-center text-gray-600">
            <span className="mr-3 text-purple-500">
              <LiaUserSecretSolid />
            </span>
            {profile?.role || "User"}
          </h3>

          {/* Email */}
          <h3 className="text-lg md:text-xl flex items-center text-gray-700 bg-gray-100 rounded-full px-4 py-2 shadow-inner">
            <span className="mr-3 text-black border-2 border-gray-300 rounded-full p-2 bg-white">
              <CiMail />
            </span>
            {profile?.email}
          </h3>
        </div>
      )}
    </div>
  );
};

export default Profile;
