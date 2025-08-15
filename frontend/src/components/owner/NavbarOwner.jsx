import React, { useContext, useState, useEffect } from "react";
import { dummyUserData, assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";
const NavbarOwner = () => {
  const { user } = useAppContext();

  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor relative transition-all">
      <Link to="/">
        <img src={assets.logo2} alt="" className="h-7" />
      </Link>

      <p>
        {"Welcome"},
        <span className="text-green-500"> 💖{user?.name || "owner"}</span>{" "}
      </p>
    </div>
  );
};

export default NavbarOwner;
