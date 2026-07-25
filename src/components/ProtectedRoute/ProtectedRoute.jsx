import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";


// If user is logged out, then user redirects to the login page
const ProtectedRoute = ({ children }) => {
  const userToken = Cookies.get("jwt_token");

  if (!userToken) {
    return <Navigate to="/login" replace />;
  }

  // User is logged in, show the requested page
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
