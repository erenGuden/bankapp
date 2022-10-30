import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const hasValidToken = () => {
  const { token } = localStorage;
  return !!token;
};
const ProtectedRoute = () => {
    return hasValidToken() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
