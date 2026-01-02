import { FiMail, FiUser } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { LiaUserSecretSolid } from "react-icons/lia";
import { CiMail } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hook/useAuth";
import useAxiosSecure from "../../hook/useAxiosSecure/useAxiosSecure";


const Profile = () => {
 const {user}=useAuth()
const axiosSecure=useAxiosSecure()
    console.log(user);
    
    const {data:profile}=useQuery({
        queryKey:['profile',user?.email],
        queryFn:async ()=>{
            const res=await axiosSecure.get(`/user?email=${user.email}`)
            console.log(res);
            
            return res.data
        }
    })
    console.log(profile);
    
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-300 ">
      {
        profile && (
          <div className="max-w-[600px] rounded-md my-2 md:my-5 text-center space-y-5 shadow-2xl bg-white p-10  mx-auto">
        <img
          className="w-[200px] mx-auto h-[200px] rounded-full "
          src={profile?.photoURL}
          alt={profile?.displayName}
        />
        <h1 className="text-3xl font-bold text-center flex items-center justify-center">
          {" "}
          <span className="mr-2">
            <FaRegUser />
          </span>
          {profile?.displayName}
        </h1>

        <h3 className="text-xl font-bold text-center flex items-center justify-center ">
          <span className="mr-2">
            <LiaUserSecretSolid />
          </span>{" "}
          {profile?.role}
        </h3>
        <h3 className="text-xl font-bold text-center flex items-center  justify-center">
          <span className="mr-2 border-2 rounded-full p-1 text-black">
            <CiMail className="text-black" />

          </span>{" "}
          {profile?.email}
        </h3>
      </div>
        )
      }
    </div>
  );
};

export default Profile;
