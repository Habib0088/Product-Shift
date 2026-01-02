import { useForm } from "react-hook-form";
import useAuth from "../../../hook/useAuth";
import { useLocation, useNavigate, Link } from "react-router";
import axios from "axios";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import { useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import Swal from "sweetalert2";

const Registration = () => {
  const [show, setShow] = useState(false);
  const { createUser, loginWithGoogle, updateUserProfile } = useAuth();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const navigator = useNavigate();

  const showToast = (message, icon = "success") => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon,
      title: message,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      background: "#f0f0f0",
      iconColor: icon === "success" ? "#16a34a" : "#dc2626",
      customClass: {
        title: "font-semibold text-gray-800",
      },
    });
  };

  const handleloginWithGoogle = () => {
    loginWithGoogle()
      .then((result) => {
        const user = result.user;
        const userProfileCreate = {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };
        axiosSecure
          .post("/users", userProfileCreate)
          .then(() => {
            navigator(location.state || "/");
            showToast("Registered with Google successfully!");
          })
          .catch((err) => {
            console.log(err);
            showToast("Google registration failed!", "error");
          });
      })
      .catch((error) => {
        console.log(error.message);
        showToast("Google registration failed!", "error");
      });
  };

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleRegister = (data) => {
    const imageUrl = data.photo[0];
    createUser(data.email, data.password)
      .then((result) => {
        const formData = new FormData();
        formData.append("image", imageUrl);
        const imageUrlKey = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_Image_host
        }`;

        axios.post(imageUrlKey, formData).then((res) => {
          const userProfileCreate = {
            displayName: data.name,
            photoURL: res.data.data.url,
            email: data.email,
          };
          axiosSecure
            .post("http://localhost:3000/users", userProfileCreate)
            .then((res) => {
              if (res.data.insertedId) {
                showToast("Registered successfully!");
                navigator("/");
              }
            })
            .catch((err) => {
              console.log(err);
              showToast("Registration failed!", "error");
            });

          updateUserProfile({
            displayName: data.name,
            photoURL: res.data.data.url,
          })
            .then(() => console.log("Profile updated"))
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
          showToast("Image upload failed!", "error");
        });
      })
      .catch((err) => {
        console.log(err.message);
        showToast("Registration failed!", "error");
      });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 py-10">
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="card w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white text-center">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
            <span>🛡️</span> Register
          </h1>
          <p className="text-white/80 mt-1">Create your ZapShift account</p>
        </div>

        {/* Form */}
        <div className="card-body space-y-3">
          {/* Name */}
          <div className="form-control text-start">
            <label className="label font-semibold text-gray-700">Name</label>
            <input
              {...register("name", { required: true })}
              type="text"
              className="input input-bordered w-full"
              placeholder="Your Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">You have not provided Name</p>
            )}
          </div>

          {/* Photo */}
          <div className="form-control text-start">
            <label className="label font-semibold text-gray-700">Upload Photo</label>
            <input
              {...register("photo", { required: true })}
              type="file"
              className="file-input file-input-bordered w-full"
            />
            {errors.photo && (
              <p className="text-red-500 text-sm mt-1">You have not provided Photo</p>
            )}
          </div>

          {/* Email */}
          <div className="form-control text-start">
            <label className="label font-semibold text-gray-700">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="input input-bordered w-full"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">You have not provided Email</p>
            )}
          </div>

          {/* Password */}
          <div className="form-control text-start relative">
            <label className="label font-semibold text-gray-700">Password</label>
            <input
              {...register("password", { required: true })}
              type={show ? "text" : "password"}
              className="input input-bordered w-full"
              placeholder="Password"
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute top-9 z-50 right-3 cursor-pointer text-gray-500"
            >
              {show ? <FaEyeSlash /> : <FaRegEye />}
            </span>
            {errors.password?.type === "required" && (
              <p className="text-red-500 text-sm mt-1">You have not provided Password</p>
            )}
          </div>

          {/* Register Button */}
          <button className="btn btn-primary w-full mt-2 text-white">Register Now</button>

          {/* Login link */}
          <p className="text-center text-gray-500 text-sm mt-2">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-semibold underline"
            >
              Login
            </Link>
          </p>

          {/* Or Divider */}
          <div className="divider">OR</div>

          {/* Google login */}
          <button
            type="button"
            onClick={handleloginWithGoogle}
            className="btn w-full bg-white text-black border border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2"
          >
            <svg
              aria-label="Google logo"
              width="18"
              height="18"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Register with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
