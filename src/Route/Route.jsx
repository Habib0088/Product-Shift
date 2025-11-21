import { createBrowserRouter } from "react-router";
import Layout from "../layout/Layout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Home/Coverage/Coverage";
import AuthLayout from "../Component/Authentication/AuthLayout/AuthLayout";
import Registration from "../Component/Authentication/Registration/Registration";
import LogIn from "../Component/Authentication/LogIn/LogIn";
import PrivateRoute from "./PrivateRoute";
import Rider from "../Component/Rider/Rider";
import SendParcel from "../Component/SendPercel/SendParcel";

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
        },{
          path:'/rider',
          element:<PrivateRoute><Rider></Rider></PrivateRoute>
        },{
          path:'/sendParcel',
          element:<PrivateRoute><SendParcel></SendParcel></PrivateRoute>,
           loader:()=>fetch('/warehouses.json').then(res=>res.json())
        }
    ]
  },
  {
    path: "/",
    Component:AuthLayout,
    children:[
      {
        path:'/registration',
        Component:Registration
      },{
        path:'/login',
        Component:LogIn
      }
    ]
  }
]);