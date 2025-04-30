import moment from "moment";
import "moment/locale/th";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ManageRoom = () => {
  const [meetingRooms, setMeetingRooms] = useState([]);
  moment.locale("th");
  const today = moment().format("HH:mm dddd, D MMMM YYYY");

  const fetchRooms = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/rooms/getAllRoom"
      );
      setMeetingRooms(response.data.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDelete = async (room) => {
    const confirmDelete = window.confirm("ยืนยันที่จะลบห้องประชุมหรือไม่?");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        "http://localhost:3000/api/rooms/deleteRoom/" + room._id
      );
      fetchRooms();
    } catch (error) {
      console.error("Error deleting room:", error);
      alert("เกิดข้อผิดพลาดในการลบห้องประชุม");
    }
  };

  return (
    <div className="bg-[#EBEDF1] h-[92vh] flex justify-center items-center">
      <div className="p-10 bg-white w-[94%] h-[80vh] shadow-md overflow-hidden">
        {/* header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="flex flex-col">
            <h1 className="text-[#8A2A2B] text-xl font-bold text-center md:text-left mb-2">
              จัดการห้องประชุม
            </h1>
            <h2 className="text-[#8A2A2B] text-l font-bold md:text-left ">
              {today}
            </h2>
          </div>

          <div className="flex flex-col justify-end mt-4 md:mt-0">
            <div className="flex items-center gap-2 mb-3">
              <div className="text-gray-600">ค้นหา : </div>
              <input
                type="text"
                className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none"
              />
            </div>
            <div className="flex justify-end">
              <Link to="/admin/addroom">
                <button className="w-35 h-7 bg-[#D9D9D9] hover:bg-[#d0d0d0] text-black rounded-md text-l cursor-pointer">
                  + เพิ่มห้องประชุม
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* table */}
        <div className="flex-1 overflow-y-auto max-h-[55vh] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b">
                <th className="w-[10%] text-center p-4">ลำดับ</th>
                <th className="w-[15%] text-center p-4">หมายเลขห้อง TH</th>
                <th className="w-[15%] text-center p-4">หมายเลขห้อง EN</th>
                <th className="w-[10%] text-center p-4">ขนาดห้อง</th>
                <th className="w-[10%] text-center p-4">อาคาร</th>
                <th className="w-[10%] text-center p-4">ศูนย์</th>
                <th className="w-[10%] text-center p-4">สถานะห้อง</th>
                <th className="w-[20%] text-center p-4">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {meetingRooms.map((room, index) => (
                <tr key={room._id} className="border-b border-gray-400">
                  <td className="text-center px-4 py-5">{index + 1}</td>
                  <td className="text-center px-4 py-5">{room.roomNameTH}</td>
                  <td className="text-center px-4 py-5">{room.roomNameEN}</td>
                  <td className="text-center px-4 py-5">{room.size}</td>
                  <td className="text-center px-4 py-5">{room.building}</td>
                  <td className="text-center px-4 py-5">
                    {room.branch === "RANGSIT"
                      ? "Rangsit"
                      : room.branch === "PATTAYA"
                      ? "Pattaya"
                      : room.branch}
                  </td>
                  <td className="px-4 py-5 flex justify-center">
                    <div className="w-20 h-9 bg-[#3B65FB] text-white rounded-md flex items-center justify-center text-sm">
                      {room.status === 0 ? "เปิดใช้งาน" : room.status}
                    </div>
                  </td>
                  <td className="text-center px-4 py-5">
                    <button
                      onClick={() => handleDelete(room)}
                      className="w-20 h-9 bg-[#FC6A6C] text-white rounded-md text-sm cursor-pointer hover:bg-[#E74C4D]"
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageRoom;
