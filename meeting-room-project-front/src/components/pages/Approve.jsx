import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";

const Approve = () => {
  const [pendingBooking, setPendingBooking] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/booking/getPendingBooking")
      .then((res) => {
        if (res.data.success) {
          setPendingBooking(res.data.data);
        }
      });
  }, []);

  const handleApproveClick = (id) => {
    localStorage.setItem("selectedPendingBookingId", id);
    navigate("/admin/approvebooking");
  };

  return (
    <>
      <div className="bg-[#EBEDF1] h-[92vh] flex justify-center items-center">
        <div className="p-10 bg-white w-[94%] h-[80vh] shadow-md overflow-hidden">
          {/* header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-[#8A2A2B] text-xl font-bold text-center md:text-left">
              อนุมัติการจองห้องประชุม
            </h1>

            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <div className="text-gray-600">ค้นหา : </div>
              <input
                type="text"
                className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none"
              />
            </div>
          </div>

          {/* table */}
          <div className="flex-1 overflow-y-auto max-h-[65vh] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="w-[10%] text-center p-4">ลำดับ</th>
                  <th className="w-[20%] text-center p-4">ห้องประชุม</th>
                  <th className="w-[15%] text-center p-4">วันที่</th>
                  <th className="w-[10%] text-center p-4">เวลา</th>
                  <th className="w-[25%] text-center p-4 hidden sm:table-cell">
                    เรื่อง
                  </th>
                  <th className="w-[10%] text-center p-4">สถานะ</th>
                  <th className="w-[10%] text-center p-4">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {pendingBooking.map(
                  (
                    {
                      _id,
                      roomNameEN,
                      bookingStartTime,
                      bookingEndTime,
                      meetingDescription,
                      bookingStatus,
                    },
                    index
                  ) => (
                    <tr key={index} className="border-b border-gray-400">
                      <td className="text-center px-4 py-5">{index + 1}</td>
                      <td className="text-center px-4 py-5">{roomNameEN}</td>
                      <td className="text-center px-4 py-5">
                        {moment(bookingStartTime).format("D")}
                      </td>
                      <td className="text-center px-4 py-5">
                        {moment(bookingStartTime).format("HH:mm")} -{" "}
                        {moment(bookingEndTime).format("HH:mm")}
                      </td>
                      <td className="text-center px-4 py-5 hidden sm:table-cell">
                        {meetingDescription}
                      </td>
                      <td className="px-4 py-5 flex justify-center">
                        <div className="w-20 h-9 bg-[#FED141] text-white rounded-md flex items-center justify-center text-sm font-bold">
                          {bookingStatus === "PENDING"
                            ? "รออนุมัติ"
                            : bookingStatus}
                        </div>
                      </td>
                      <td className="text-center px-4 py-5">
                        <button
                          className="w-20 h-9 bg-[#3B65FB] text-white rounded-md text-sm cursor-pointer hover:bg-[#2650E6]"
                          onClick={() => handleApproveClick(_id)}
                        >
                          อนุมัติ
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Approve;
