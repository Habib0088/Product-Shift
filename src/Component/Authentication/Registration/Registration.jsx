import { useForm } from "react-hook-form";
import useAuth from "../../../hook/useAuth";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import { useState } from "react";

const Registration = () => {
  const [show, setShow] = useState(false);
  const { createUser, loginWithGoogle, updateUserProfile } = useAuth();
  const location = useLocation();

  const axiosSecure = useAxiosSecure();

  const navigator = useNavigate();
  // console.log(location.state);

  const handleloginWithGoogle = () => {
    loginWithGoogle()
      .then((result) => {
         const user=result.user;
        console.log(user);

        const userProfileCreate={
          email:user.email,
          displayName:user.displayName,
          photoURL:user.photoURL

        }
        axiosSecure.post('/users',userProfileCreate).then((res)=>{
          console.log( res.data);
          navigator(location.state || '/')
        }).catch(err=>console.log(err)
        )


        // console.log(result.user);
        navigator(location.state || "/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    // console.log(data);
    const imageUrl = data.photo[0];
    // console.log(imageUrl);
    createUser(data.email, data.password)
      .then((result) => {
        // 1 store the image in formData
        const formData = new FormData();
        formData.append("image", imageUrl);
        // send the photo to store and get the url
        const imageUrlKey = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_Image_host
        }`;

        axios.post(imageUrlKey, formData).then((res) => {
          console.log(res.data.data.url);

          const userProfileCreate = {
            displayName: data.name,
            photoURL: res.data.data.url,
            email: data.email,
          };
          // Create user to the database
          axiosSecure
            .post("http://localhost:3000/users", userProfileCreate)
            .then((res) => {
              if (res.data.insertedId) {
                console.log("created user ");
              }
            })
            .catch((err) => console.log(err));

          // Update profile to firebase
          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };
          updateUserProfile(userProfile)
            .then(() => {
              console.log("profile updated successfully");
            })
            .catch((err) => console.log(err));
        });
        // axios.post(imageUrl)
        const user = result.user;
        // console.log(user);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="w11/12 mx-auto ">
      <h1 className="text-center font-bold text-2xl"></h1>
      <form
        className=" card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl relative"
        onSubmit={handleSubmit(handleRegister)}
      >
        <div className="card-body">
          <fieldset className="fieldset ">
            {/* Name */}
            <label className="label font-semibold">Name</label>
            <input
              {...register("name", { required: true })}
              type="text"
              className="input"
              placeholder="Your Name"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">You have not provided Name</p>
            )}
            {/* Photo */}
            <label className="label font-semibold">Upload Photo</label>
            <input
              {...register("photo", { required: true })}
              type="file"
              className="file-input"
              placeholder="Photo"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">You have not provided Photo</p>
            )}
            {/* Email */}
            <label className="label font-semibold">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="input"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">You have not provided email</p>
            )}
            {/* Password */}
            <label className="label font-semibold font-semi-bold">
              Password
            </label>
            <input
              {...register("password", {
                required: true,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              })}
              type={show ? "password" : "text"}
              className="input "
              placeholder="Password"
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute  top-[275px] right-8"
            >
              {show ? "Show" : "Hide"}
            </span>
            {errors.password?.type === "pattern" && (
              <p className="text-red-500">
                Password must be at least 8 characters, include uppercase,
                lowercase, number and special character.
              </p>
            )}
            {errors.password?.type === "required" && (
              <p className="text-red-500">Your have not provided Passoword</p>
            )}
            <div></div>
            <button className="btn btn-neutral mt-4 w-full">
              Register Now
            </button>
            <button
              onClick={handleloginWithGoogle}
              className="btn bg-white text-black border-[#e5e5e5]"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
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
              Login with Google
            </button>
          </fieldset>
        </div>
      </form>
    </div>
  );
};

export default Registration;
