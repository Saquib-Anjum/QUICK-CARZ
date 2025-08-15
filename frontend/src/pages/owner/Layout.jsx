import React, { useState, useEffect } from "react";
import Sidebar from "../../components/owner/Sidebar";
import NavbarOwner from "../../components/owner/NavbarOwner";
import Dashboard from "../../pages/owner/Dashboard";
import { useAppContext } from "../../context/AppContext";
import { Outlet } from "react-router-dom";
const Layout = () => {
  const { isOwner, navigate } = useAppContext();
  //console.log("bhai yeh to lay out ewala hai", isOwner);
  useEffect(() => {
    if (!isOwner) {
      // navigate("/");
    }
  }, []);
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
