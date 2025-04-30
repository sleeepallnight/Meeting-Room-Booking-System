import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiClock } from "react-icons/fi";
import { PiWarning } from "react-icons/pi";
import axios from "axios";
import moment from "moment";

const Reserve = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [roomData, setRoomData] = useState(null);
  const [meetingName, setMeetingName] = useState("");
  const [meetingInfo, setMeetingInfo] = useState("");
  const lastTime = selectedTimes[selectedTimes.length - 1];
  const finishedTimeRaw = moment(lastTime).add(1, "hours");
  const finishedTime = moment(lastTime).add(1, "hours").format("HH:mm");

  useEffect(() => {
    const userDataFromStorage = localStorage.getItem("userData");
    const timesFromStorage = localStorage.getItem("selectedTimes");
    const roomId = localStorage.getItem("selectedRoomId");

    if (roomId) {
      axios
        .get("http://localhost:3000/api/rooms/getRoom/" + roomId)
        .then((res) => {
          if (res.data.success) {
            setRoomData(res.data.data);
          }
        })
        .catch((err) => console.error("Fetch room failed:", err));
    }

    if (userDataFromStorage) {
      setUserData(JSON.parse(userDataFromStorage));
    }

    if (timesFromStorage) {
      setSelectedTimes(JSON.parse(timesFromStorage));
    }
  }, []);

  const handleBooking = async () => {
    if (!meetingName || !meetingInfo) {
      alert("กรุณากรอกชื่อและรายละเอียดการประชุม");
      return;
    }

    const bookingData = {
      meetingName: meetingName,
      meetingDescription: meetingInfo,
      roomNameTH: roomData.roomNameTH,
      roomNameEN: roomData.roomNameEN,
      customerUsername: userData.username,
      customerDepartment: userData.department,
      customerEmail: userData.email,
      bookingStartTime: selectedTimes[0],
      bookingTime: selectedTimes,
      bookingEndTime: finishedTimeRaw,
      requireApprove: true,
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/booking/book",
        bookingData
      );
      if (res.data.success) {
        alert("จองห้องสำเร็จ!");
        navigate("/mybooking");
      } else {
        alert("เกิดข้อผิดพลาดในการจอง");
      }
    } catch (error) {
      console.error("Booking failed:", error);
      alert("ไม่สามารถจองได้ กรุณาลองใหม่ภายหลัง");
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  if (!roomData || !userData || selectedTimes.length === 0)
    return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-6">
      {/* Header */}
      <div className="border p-4 flex justify-between items-center">
        <div className="text-center border-r pr-4 flex flex-col gap-2">
          <div className="text-sm">
            {moment(selectedTimes[0]).format("dddd")}
          </div>
          <div className="text-2xl font-bold">
            {moment(selectedTimes[0]).format("D")}
          </div>
          <div className="text-sm">
            {moment(selectedTimes[0]).format("MMMM")}
          </div>
        </div>
        <div className="flex-1 ml-4">
          <h2 className="text-lg font-bold">{roomData.roomNameEN}</h2>
          <div className="flex items-center text-sm my-2">
            <FiClock className="mr-2" />
            {moment(selectedTimes[0]).format("HH:mm")} - {finishedTime}
          </div>
          <div className="text-sm">
            {userData.displayNameTH} {userData.username}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="mt-5">
        <div className=" font-semibold">ชื่อการประชุม</div>
        <input
          className="w-full border border-[#CECECE] p-2 mt-3 rounded-sm"
          type="text"
          name="meetingName"
          value={meetingName}
          onChange={(e) => setMeetingName(e.target.value)}
        />

        <div className=" font-semibold mt-4">รายละเอียดการประชุม</div>
        <textarea
          className="w-full border border-[#CECECE] p-2 mt-3 rounded-sm h-24"
          name="meetingInfo"
          value={meetingInfo}
          onChange={(e) => setMeetingInfo(e.target.value)}
        />
      </div>

      {/* Note */}
      <div className="flex gap-3 items-center mt-5 p-4 bg-red-100 rounded-2xl">
        <PiWarning className="text-[#8A2A2B] font-semibold text-5xl ml-2" />
        <div className="flex flex-col gap-2">
          <div className="font-bold">Note :</div>
          <ul className="list-decimal pl-7 text-sm ">
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-[#A6A6A6]">
              ฉันอ่านและยอมรับเงื่อนไข
            </span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-5 flex justify-end space-x-2">
        <button
          className="bg-[#E2E2E2] text-gray-600 px-5 py-1 rounded cursor-pointer"
          onClick={handleClose}
        >
          Close
        </button>
        <button
          className="bg-[#8A2A2B] text-white px-5 py-1 rounded cursor-pointer"
          onClick={handleBooking}
        >
          Booking
        </button>
      </div>
    </div>
  );
};

export default Reserve;
