import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import AuthContext from "../../Context/AuthContext/AuthContext";

const PaymentHistory = () => {
  const { user } = useAuth();
//   const{user}=AuthContext()
//   console.log(user);
  
  const axiosSecure = useAxiosSecure();
  const { data:payments = [] } = useQuery({
    queryKey: [],
    queryFn: async () => {
        const res=await axiosSecure.get(`/payments?email=${user.email}`)
        return res.data
    },
  });
//   console.log(payments);
  
  return <div className="md:w-11/12 mx-auto">
   
    <h1 className="text-4xl font-bold">Payment History : {payments.length}</h1>

  <div className="overflow-x-auto ">
  <table className="table table-zebra ">
    {/* head */}
    <thead>
      <tr>
        <th>NO</th>
        <th>Name</th>
        <th>Amount</th>
        <th>Transaction ID</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
    {
        payments.map((payment,index)=>    <tr>
        <th>{index+1}</th>
        <td className="font-semibold capitalize">{payment.parcelName}</td>
        <td className="font-semibold">{payment.amount}</td>
        <td className="font-semibold">{payment.transactionId}</td>
      </tr>
)
    }


    </tbody>
  </table>
</div>

  </div>;
};

export default PaymentHistory;
