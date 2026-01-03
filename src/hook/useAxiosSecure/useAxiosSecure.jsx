import axios from "axios";
import { useEffect } from "react";
import useAuth from "../useAuth";
import { useNavigate } from "react-router";

// Create Axios instance
const axiosSecure = axios.create({
  baseURL: "https://rideshift.vercel.app",
});

const useAxiosSecure = () => {
    const navigate=useNavigate()
  const { user ,logOut} = useAuth();

  if (user) {
    // console.log("AccessToken:", user.accessToken);
  }

  useEffect(() => {
    if (!user) return;

    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
      return config;
    });

    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
        const statusCode=error.status
        if(statusCode===401 || statusCode===403){
            logOut().then(()=>{
                navigate('/login')
            })
        }
        return Promise.reject(error)
      }
    );

    return () => {
        axiosSecure.interceptors.request.eject(reqInterceptor)
        axiosSecure.interceptors.response.eject(resInterceptor)
    };
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;
