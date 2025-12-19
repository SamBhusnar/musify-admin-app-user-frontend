import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { LogOut, Menu, User, X } from "lucide-react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SideBar from "./SideBar";

function NavBar({ activeMenu }) {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    toast.success("logout successfully");
    navigate("/login");
  };
  return (
    <div className="flex items-center justify-between bg-white   gap-5 border  border-b border-gray-200/50   backdrop-blur-[2px] py-4 px-4 sm:px-7 stiky top-0 z-30">
      {/*  Left side menu and title */}
      <div className="flex items-center gap-5">
        <button
          onClick={() => setOpenSideMenu((prev) => !prev)}
          className="block lg:hidden hover:bg-gray-100 p-1 rounded transition-colors "
        >
          {openSideMenu ? (
            <X className="text-2xl" />
          ) : (
            <Menu className="text-2xl" />
          )}
        </button>
        <div className="flex items-center gap-2">
          <img src={assets.logo} alt="logo" className="w-12 h-12" />
          <span className="text-2xl font-bold">Musify</span>
        </div>
      </div>
      {/*  Right side ser info and logout */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg ">
          {/* user icon of lucide react */}
          <User className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700 truncate max-w-full">
            {user?.email}
          </span>
          <span className="text-sm bg-green-200 px-2 py-1 rounded-full font-[500] ">
            {user?.role}
          </span>
        </div>
        {/* logout btn  */}
        <button
          title="logout"
          onClick={() => handleLogout()}
          className="flex items-center gap-2 bg-red-50  hover:bg-red-100 px-3 py-2 rounded-lg text-red-600  transition-colors duration-200"
        >
          <LogOut className="w-4 h-4 " />
          <span className="hidden sm:inline text-sm font-medium ">Logout</span>
        </button>
      </div>
      {/* mobile side menu */}
      {
        openSideMenu && (
          <div className="fixed top-[73px] left-0 right-0 w-full  bg-white  border-b  border-gray-200 lg:hidden z-20">
            <SideBar activeMenu={activeMenu} />
          </div>
        )
      }
    </div>
  );
}

export default NavBar;
