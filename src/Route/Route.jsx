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
import DashboardLayout from "../Component/DashboardLayout/DashboardLayout/DashboardLayout";
import MyParcel from "../Component/DashboardLayout/MyParcel/MyParcel";
import Payment from "../Component/DashboardLayout/Payment/Payment";
import PaymenSuccessful from "../Component/DashboardLayout/Payment/PaymenSuccessful";
import PaymentCancelled from "../Component/DashboardLayout/Payment/PaymentCancelled";
import AnimatedPage from "../Component/Animate/Animate";
import PaymentHistory from "../Component/DashboardLayout/PaymentHistory/PaymentHistory";
import ApproveRiders from "../Component/DashboardLayout/ApproveRiders/ApproveRiders";


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
          element:<PrivateRoute><Rider></Rider></PrivateRoute>,
          loader:()=>fetch('/warehouses.json').then(res=>res.json())

        },{
          path:'/sendParcel',
          element:<PrivateRoute><SendParcel></SendParcel></PrivateRoute>,
           loader:()=>fetch('/warehouses.json').then(res=>res.json())
        },{
          path:'payment-history',
          Component:PaymentHistory
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
  },{
    path:'/dashboard',
    element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children:[
      {
        path:'/dashboard/myParcel',
        Component:MyParcel
      },{
        path:'/dashboard/payment/:id',
        Component:Payment
      },
      {
        path:'/dashboard/payment-success',
        Component:PaymenSuccessful
      },
      {
        path:'/dashboard/payment-cancelled',
        Component:PaymentCancelled
      },{
        path:'/dashboard/approveRiders',
        Component:ApproveRiders
      }
    ]
  },
  {
    path:'animate',
    Component:AnimatedPage
  }
]);