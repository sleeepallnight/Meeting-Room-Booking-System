import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { BiSolidDashboard } from "react-icons/bi";
import {
  IoCheckmarkCircle,
  IoToday,
  IoAddCircle,
  IoLogOut,
} from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.clear();
    navigate("/adminlogin");
  };

  return (
    <div className="bg-[#979797] flex flex-col h-screen w-62 sticky top-0">
      <div className="flex flex-col items-center justify-center pt-12 pb-10">
        <CgProfile className="w-20 h-20 mb-2 text-white" />
        <span className="text-2xl text-white font-bold">Admin</span>
      </div>

      <div className="flex-1">
        <ul>
          <Link to="/admin">
            <li className="flex items-center py-4 px-6 cursor-pointer hover:bg-[#565656]">
              <IoCheckmarkCircle className="w-7 h-7 text-white" />
              <span className="text-white text-base font-bold ml-4">
                อนุมัติการจอง
              </span>
            </li>
          </Link>

          <Link to="/admin/bookinginfo">
            <li className="flex items-center py-4 px-6 cursor-pointer hover:bg-[#565656]">
              <IoToday className="w-7 h-7 text-white" />
              <span className="text-white text-base font-bold ml-4">
                ข้อมูลการจองทั้งหมด
              </span>
            </li>
          </Link>

          <Link to="/admin/manageroom">
            <li className="flex items-center py-4 px-6 cursor-pointer hover:bg-[#565656]">
              <IoAddCircle className="w-7 h-7 text-white" />
              <span className="text-white text-base font-bold ml-4">
                จัดการห้องประชุม
              </span>
            </li>
          </Link>

          <Link to="/admin/dashboard">
            <li className="flex items-center py-4 px-6 cursor-pointer hover:bg-[#565656]">
              <BiSolidDashboard className="w-7 h-7 text-white" />
              <span className="text-white text-base font-bold ml-4">
                แดชบอร์ด
              </span>
            </li>
          </Link>
        </ul>
      </div>

      <div className="mt-auto mb-6">
        <ul>
          <Link to="/adminlogin" onClick={handleLogout}>
            <li className="flex items-center py-4 px-6 cursor-pointer hover:bg-[#565656] transition duration-200">
              <IoLogOut className="w-7 h-7 text-white" />
              <span className="text-white text-base font-bold ml-4">
                Log Out
              </span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
