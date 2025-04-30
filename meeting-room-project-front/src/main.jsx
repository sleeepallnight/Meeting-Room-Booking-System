import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

import Layout from "./components/shared/Layout";
import UserLayout from "./components/shared/UserLayout.jsx";

import Home from "./components/pages/user/Home.jsx";
import MyBooking from "./components/pages/user/MyBooking.jsx";
import RoomInfo from "./components/pages/user/RoomInfo.jsx";
import Account from "./components/pages/user/Account.jsx"
import Setting from "./components/pages/user/Setting.jsx";
import RoomStatus from "./components/pages/user/RoomStatus.jsx";
import Reserve from "./components/pages/user/Reserve.jsx";
import UserLogin from "./components/pages/user/UserLogin.jsx"

import Approve from "./components/pages/Approve.jsx";
import BookingInfo from "./components/pages/BookingInfo.jsx";
import ManageRoom from "./components/pages/ManageRoom.jsx";
import AddRoom from "./components/pages/AddRoom.jsx";
import Dashboard from "./components/pages/Dashboard.jsx";
import Login from "./components/pages/Login";
import ApproveBooking from "./components/pages/ApproveBooking.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/mybooking",
        element: <MyBooking />,
      },
      {
        path: "/roominfo",
        element: <RoomInfo />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/setting",
        element: <Setting />
      },
      {
        path: "/roomstatus",
        element: <RoomStatus />
      },
      {
        path: "/reserve",
        element: <Reserve />
      },
      
    ]
  },
  {
    path: "/admin",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Approve />,
      },
      {
        path: "bookinginfo",
        element: <BookingInfo />,
      },
      {
        path: "manageroom",
        element: <ManageRoom />,
      },
      {
        path: "addroom",
        element: <AddRoom />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "approvebooking",
        element: <ApproveBooking />,
      },
    ],
  },
  {
    path: "/adminlogin",
    element: <Login />,
  },
  {
    path: "/login",
    element: <UserLogin />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
