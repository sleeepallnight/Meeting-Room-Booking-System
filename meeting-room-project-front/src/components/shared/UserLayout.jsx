import React from "react";
import { Outlet } from "react-router-dom";
import UserNav from "./UserNav";

function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <UserNav />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default UserLayout;
