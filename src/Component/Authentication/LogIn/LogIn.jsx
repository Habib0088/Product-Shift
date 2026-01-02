import React, { use } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../../Context/AuthContext/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";

const LogIn = () => {
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const navigator = useNavigate();
  const { loginUeser, loginWithGoogle } = use(AuthContext);

  const handleGoogle = () => {
    loginWithGoogle()
      .then((result) => {
        const user = result.user;

        const userProfileCreate = {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };

        axiosSecure.post("/users", userProfileCreate).then(() => {
          navigator(location.state || "/");
        });
      })
      .catch((error) => console.log(error.message));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    loginUeser(data.email, data.password)
      .then(() => navigator(location.state || "/"))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4">
      <div className="card bg-base-100 w-full max-w-md shadow-2xl border border-gray-100 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white">
          <h1 className="text-3xl font-bold">Welcome Back 👋</h1>
          <p className="opacity-90 text-sm mt-1">
            Login to continue using{" "}
            <span className="font-semibold">Ride Shift</span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="card-body space-y-3">
            <div className="form-control w-full text-start">
              <label className="label p-0 mb-1 font-medium text-gray-700 text-start">
                Email
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                className="input input-bordered w-full text-start"
                placeholder="Enter your email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1 text-start">
                  Email is required
                </span>
              )}
            </div>

            <div className="form-control w-full text-start mt-3">
              <label className="label p-0 mb-1 font-medium text-gray-700 text-start">
                Password
              </label>
              <input
                {...register("password", { required: true })}
                type="password"
                className="input input-bordered w-full text-start"
                placeholder="Enter your password"
              />
              {errors.password && (
                <span className="text-red-500 text-sm mt-1 text-start">
                  Password is required
                </span>
              )}
            </div>

            <button className="btn btn-primary w-full mt-3">Login</button>

            <p className="text-sm text-center text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/registration"
                className="text-indigo-600 font-semibold underline"
              >
                Register
              </Link>
            </p>

            <div className="divider my-1">or</div>

            <button
              onClick={handleGoogle}
              type="button"
              className="btn w-full bg-white border border-gray-200 hover:bg-gray-50"
            >
              <svg
                aria-label="Google logo"
                width="18"
                height="18"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff" />
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  />
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  />
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  />
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  />
                </g>
              </svg>
              Login with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
