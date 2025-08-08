import React from "react";
import Sidebar from "../../components/owner/Sidebar";
import NavbarOwner from "../../components/owner/NavbarOwner";
import Dashboard from "../../pages/owner/Dashboard";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="flex flex-col">
      <NavbarOwner />
      <div className="flex">
        <Sidebar />
        {/* <Dashboard /> */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
