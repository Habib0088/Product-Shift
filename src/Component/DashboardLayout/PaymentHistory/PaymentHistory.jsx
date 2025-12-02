import { useQuery } from "@tanstack/react-query";
import React from "react";


import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";


const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="md:w-11/12 mx-auto">
      <h1 className="text-4xl font-bold fontse">
        Payment History : {payments.length}
      </h1>

      <div className="overflow-x-auto mt-4">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>NO</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment.transactionId}>
                <th>{index + 1}</th>
                <td className="font-semibold capitalize">{payment.parcelName}</td>
                <td className="font-semibold">{payment.amount}</td>
                <td className="font-semibold">{payment.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
