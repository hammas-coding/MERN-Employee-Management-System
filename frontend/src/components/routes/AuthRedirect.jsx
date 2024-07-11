// src/components/routes/AuthRedirect.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthRedirect = () => {
  const navigate = useNavigate();
  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/admin/manage-employee");
    } else {
      navigate("/admin-login");
    }
  }, [navigate]);

  return null;
};

export default AuthRedirect;
