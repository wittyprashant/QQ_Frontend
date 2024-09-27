import React from "react";
import { Navigate } from "react-router-dom";
import { usePermify } from "@permify/react-role";

const AuthenticatedRoute = ({ children, redirectTo }) => {
  const { setUser } = usePermify();
  const auth = JSON.parse(localStorage.getItem("userDetail"));

  if (auth && auth?.roleId) {
    setUser({
      id: auth?._id,
      roles: [auth?.roleId],
    });
  }
  
  const isAuthenticated = auth && auth?.role;
  return !isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export default AuthenticatedRoute;
