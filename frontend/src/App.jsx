import React from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminRegister from "./components/auth/AdminRegister";
import OtpPage from "./components/auth/OtpPage";
import AdminLogin from "./components/auth/AdminLogin";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import PublicRoute from "./components/routes/PublicRoute";
import "./App.css";
import AdminLayout from "./components/admin/AdminLayout";
import AddEmployee from "./components/admin/AddEmployee";
import UpdateEmployees from "./components/admin/UpdateEmployees";
import ManageEmployees from "./components/admin/ManageEmployees";
import AuthRedirect from "./components/routes/AuthRedirect";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <AdminRegister />
            </PublicRoute>
          }
        />
        <Route
          path="/admin-login"
          element={
            <PublicRoute>
              <AdminLogin />
            </PublicRoute>
          }
        />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/auth-redirect" element={<AuthRedirect />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="manage-employee" element={<ManageEmployees />} />
          <Route path="add-employee" element={<AddEmployee />} />
          <Route path="update-employee/:id" element={<UpdateEmployees />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
