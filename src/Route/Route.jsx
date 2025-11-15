import { createBrowserRouter } from "react-router";
import Layout from "../layout/Layout";
import Home from "../Pages/Home/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:Layout,
    children:[
        {
            index:true,
            Component:Home
        }
    ]
  },
]);