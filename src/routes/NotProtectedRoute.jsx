import React from 'react'
import { Navigate, Outlet } from "react-router-dom";

const hasValidToken = () => {
    const { token } = localStorage;
    return !!token;
  };
  const NotProtectedRoute = () => {
      return hasValidToken() ? <Navigate to="/" /> : <Outlet />;
  };

export default NotProtectedRoute
