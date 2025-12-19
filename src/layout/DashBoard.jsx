import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

function DashBoard({ children, activeMenu }) {
  return (
    <div className="">
      <NavBar activeMenu={activeMenu} />
      <div className="flex">
        <div className="max-[1080px]:hidden">
          <SideBar activeMenu={activeMenu} />
        </div>
        <div className="grow mx-5">{children}</div>
      </div>
    </div>
  );
}

export default DashBoard;
