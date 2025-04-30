import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { IoHomeSharp, IoLogOutSharp } from "react-icons/io5";
import {
  FaCalendarCheck,
  FaCalendarAlt,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";

const user = {
  name: "Catherine Yingmun",
  id: 6510742262,
  department: "Soft-en",
  email: "catherine@gmail.com",
};

const UserNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="w-full z-10 h-[8vh] bg-[#8A2A2B] flex items-center justify-between text-white px-6 sticky top-0 shadow-md">
      <Link to="/" className="text-2xl font-semibold">
        Meeting Room
      </Link>

      <div className="hidden md:flex items-center text-lg ml-auto">
        <Link
          to="/"
          className="hover:bg-white hover:text-[#8A2A2B] px-3 py-1 rounded-sm font-semibold mr-8"
        >
          Home
        </Link>
        <Link
          to="/mybooking"
          className="hover:bg-white hover:text-[#8A2A2B] px-3 py-1 rounded-sm font-semibold mr-8"
        >
          My Booking
        </Link>
      </div>

      <button
        className="text-2xl text-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {menuOpen && (
        <div className="fixed top-0 right-0 w-[50%] max-w-sm h-full bg-[#8A2A2B] text-white flex flex-col p-6 z-50 shadow-lg">
          <button
            className="text-2xl self-end mb-4"
            onClick={() => setMenuOpen(false)}
          >
            <FiX />
          </button>
          <Link
            to="/"
            className="text-lg font-semibold py-3 flex items-center gap-3 "
          >
            <IoHomeSharp /> Home
          </Link>
          <div className="text-lg font-semibold py-3 flex items-center gap-3">
            My Booking
          </div>
          <Link
            to="/mybooking"
            className="text-lg  py-3 flex items-center gap-3"
          >
            <FaCalendarCheck /> My Booking
          </Link>
          {/* <div className="text-lg font-semibold py-3 flex items-center gap-3">
            Overview
          </div>
          <Link
            to="/roomstatus"
            className="text-lg py-3 flex items-center gap-3"
          >
            <FaCalendarAlt /> Room Status
          </Link> */}
          <div className="text-lg font-semibold py-3 flex items-center gap-3">
            Setting
          </div>
          <Link to="/setting" className="text-lg  py-3 flex items-center gap-3">
            <FaCog /> Setting
          </Link>
          <div className="mt-auto pt-4">
            <Link
              to="/account"
              className="text-lg py-3 flex items-center gap-3"
            >
              <MdAccountCircle /> Account
            </Link>
            <Link
              to="/login"
              onClick={handleLogout}
              className="text-lg flex items-center gap-3"
            >
              <IoLogOutSharp /> Log out
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserNav;
