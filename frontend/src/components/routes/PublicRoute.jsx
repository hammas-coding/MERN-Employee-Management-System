// src/components/routes/PublicRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };
  if (isAuthenticated()) {
    return <Navigate to="/admin/manage-employee" />;
  }

  return children;
};

export default PublicRoute;
