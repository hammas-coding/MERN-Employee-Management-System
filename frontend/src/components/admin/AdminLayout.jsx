import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./AdminNavbar";

const AdminLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
