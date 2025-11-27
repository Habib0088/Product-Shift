import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";

const PaymenSuccessful = () => {
  const [paymentInfo, setPaymentInfo] = useState({})
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
//   console.log(sessionId);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success/?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({ transactionId: res.data.transactionId,
            trackingId:res.data.trackingId})
        });
    }
  }, [sessionId, axiosSecure])
  return(
    <div>
      <h2>Payment Successful</h2>
    </div>
  );
};

export default PaymenSuccessful;
