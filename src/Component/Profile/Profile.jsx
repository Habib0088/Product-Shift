import { FiMail, FiUser } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { LiaUserSecretSolid } from "react-icons/lia";
import { CiMail } from "react-icons/ci";

const Profile = ({ photo, name, role, email }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-300 ">
      <div className="max-w-[600px] rounded-md my-2 md:my-5 text-center space-y-5 shadow-2xl bg-white p-10  mx-auto">
        <img
          className="w-[200px] mx-auto h-[200px] rounded-full "
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWKkc6R4ZvVfaxUevrPb4BVGAcMOLh3wHnFg&s"
          alt=""
        />
        <h1 className="text-3xl font-bold text-center flex items-center justify-center">
          {" "}
          <span className="mr-2">
            <FaRegUser />
          </span>
          Habibur Rahman Sarker
        </h1>

        <h3 className="text-xl font-bold text-center flex items-center justify-center ">
          <span className="mr-2">
            <LiaUserSecretSolid />
          </span>{" "}
          User
        </h3>
        <h3 className="text-xl font-bold text-center flex items-center  justify-center">
          <span className="mr-2 border-2 rounded-full p-1 text-black">
            <CiMail className="text-black" />

          </span>{" "}
          Sarker@gmai.com
        </h3>
      </div>
    </div>
  );
};

export default Profile;
