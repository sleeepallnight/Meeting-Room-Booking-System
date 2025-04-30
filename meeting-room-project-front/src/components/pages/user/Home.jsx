import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import roomImage from "../../Assets/image409.png";

const Home = () => {
  const [meetingRooms, setMeetingRooms] = useState([]);
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
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

    fetchRooms();
  }, []);

  // Group ตาม branch
  const groupedRooms = meetingRooms.reduce((acc, room) => {
    if (!acc[room.branch]) acc[room.branch] = [];
    acc[room.branch].push(room);
    return acc;
  }, {});

  const handleRoomClick = (room) => {
    localStorage.setItem("selectedRoomId", room._id);
    localStorage.setItem("selectedRoomNameEN", room.roomNameEN);
  };

  return (
    <div className="min-h-screen">
      {showAlert && (
        <div
          className="bg-[#54585A] text-white p-3 text-center text-sm flex justify-between"
          name="alertBar"
        >
          <span>Please choose Meeting room</span>
          <button
            className="text-white"
            name="closeX"
            onClick={() => setShowAlert(false)}
          >
            ✕
          </button>
        </div>
      )}

      {/* body */}
      <div className="p-6 flex flex-col md:flex-row gap-6 max-w-8xl mx-auto">
        {Object.entries(groupedRooms).map(([branchName, rooms], index) => (
          <div key={index} className="relative w-full md:w-1/2">
            {/* ชื่อศูนย์ */}
            <div className="bg-[#8A2A2B] text-white px-6 py-4 pb-12 rounded-md text-lg font-semibold relative">
              {index + 1}.{" "}
              {branchName === "RANGSIT"
                ? "Rangsit Campus"
                : branchName === "PATTAYA"
                ? "Pattaya Campus"
                : branchName}
            </div>

            {/* ทุกห้องประชุม */}
            <div
              className="p-6 grid grid-cols-2 gap-8 relative mt-[-55px] max-[350px]:p-5 max-[350px]:gap-6"
              name="roomBadge"
            >
              {rooms.map((room) => (
                <Link
                  to="/roominfo"
                  key={room._id}
                  onClick={() => handleRoomClick(room)}
                >
                  <div
                    className="bg-[#A6A6A6] w-full h-36 rounded-lg shadow-md relative cursor-pointer"
                    style={{
                      backgroundImage: `url(/Users/pumipu/Meeting-Room-Final/meeting-room-project-front/src/components/Assets/${room.roomImage})`,
                    }}
                  >
                    <span className="absolute bottom-5 left-0 w-full text-center text-sm font-semibold text-white">
                      {room.roomNameEN}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
