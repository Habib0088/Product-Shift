import React from "react";
import { Link } from "react-router";

const PaymentCancelled = () => {
  return (
    <div>
      <h1>Payment has been cancelled</h1>
     <Link to='/dashboard/myParcel'> <button className="btn btn-primary">Try Again</button></Link>
    </div>
  );
};

export default PaymentCancelled;
