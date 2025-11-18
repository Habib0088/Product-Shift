import { createBrowserRouter } from "react-router";
import Layout from "../layout/Layout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Home/Coverage/Coverage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:Layout,
    children:[
        {
            index:true,
            Component:Home
        },{
          path:'coverage',
          Component:Coverage,
          loader:()=>fetch('/warehouses.json').then(res=>res.json())
        }
    ]
  },
]);