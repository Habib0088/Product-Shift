import React from "react";
import useRole from "../hook/useRole";
import Restriction from "../Component/Restriction/Restriction";

const RiderRoute = ({ children }) => {
  const { role } = useRole();
  if (role !== "rider") {
    return <Restriction></Restriction>;
  }
  return children;
};

export default RiderRoute;
