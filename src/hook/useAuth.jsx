import React, { use } from "react";
import AuthContext from "../Component/Context/AuthContext/AuthContext";

const useAuth = () => {
  const authInfo = use(AuthContext);
  return authInfo;
};

export default useAuth;
