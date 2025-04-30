import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { format, addDays, subWeeks, addWeeks, startOfWeek } from "date-fns";
import clsx from "clsx";

const bookingStatus = {
  "Meeting room 1": {
    "2025-03-31 09:00": "holiday",
    "2025-03-31 10:00": "pending",
    "2025-03-31 11:00": "pending",
    "2025-03-31 12:00": "using",
    "2025-03-31 13:00": "using",
    "2025-03-31 15:00": "booked",
    "2025-04-01 09:00": "booked",
    "2025-04-01 10:00": "booked",
    "2025-04-01 13:00": "booked",
    "2025-04-01 16:00": "booked",
    "2025-04-02 11:00": "booked",
    "2025-04-02 12:00": "booked",
    "2025-04-02 13:00": "booked",
  },
  "Meeting room 2": {
    "2025-03-31 10:00": "pending",
    "2025-03-31 11:00": "pending",
    "2025-03-31 12:00": "dropped",
    "2025-03-31 13:00": "dropped",
    "2025-03-31 15:00": "booked",
    "2025-04-01 09:00": "booked",
    "2025-04-01 10:00": "booked",
    "2025-04-01 13:00": "booked",
    "2025-04-01 16:00": "booked",
    "2025-04-02 11:00": "booked",
    "2025-04-02 12:00": "booked",
    "2025-04-02 13:00": "booked",
  },
};

const holidays = ["2025-03-30", "2025-04-05"];

const RoomStatus = () => {
  const [currentWeek, setCurrentWeek] = useState(
    startOfWeek(new Date(), { weekStartsOn: 0 })
  );
  const rooms = ["Meeting room 1", "Meeting room 2"];

  const handlePrevWeek = () => setCurrentWeek(subWeeks(currentWeek, 1));
  const handleNextWeek = () => setCurrentWeek(addWeeks(currentWeek, 1));

  const days = Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i));
  const times = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  const getStatus = (roomName, day, time) => {
    const dateKey = format(day, "yyyy-MM-dd");
    const timeKey = `${dateKey} ${time}`;
    if (holidays.includes(dateKey)) {
      return "holiday";
    }
    return bookingStatus[roomName]?.[timeKey] || "available";
  };
  const getColor = (status) => {
    switch (status) {
      case "available":
        return "bg-white border border-gray-300";
      case "booked":
        return "bg-[#8A2A2B]";
      case "pending":
        return "bg-[#90DCF8]";
      case "using":
        return "bg-[#1A5D44]";
      case "dropped":
        return "bg-[#F1802E]";
      case "holiday":
        return "bg-[#A6A6A6]";
      default:
        return "bg-white border-gray-300";
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 max-[350px]:p-5">
      {/* Status: */}
      <div className="flex md:flex-row md:items-center justify-center ">
        <div className="mr-2 max-[500px]:mt-2">Status:</div>
        <div className="grid grid-cols-4 gap-x-1 gap-y-1 md:flex md:gap-4 mb-4">
          <div className="flex items-center gap-1 ">
            <div className="min-w-6 min-h-6 rounded-full border border-gray-400"></div>
            <div className="text-sm">ว่าง</div>
          </div>
          <div className="flex items-center gap-1">
            <div className="min-w-6 min-h-6 rounded-full bg-[#8A2A2B]"></div>
            <div className="text-sm">ไม่ว่าง</div>
          </div>
          <div className="flex items-center gap-1">
            <div className="min-w-6 min-h-6 rounded-full bg-[#1A5D44]"></div>
            <div className="text-sm">กำลังใช้งาน</div>
          </div>
          <div className="flex items-center gap-1">
            <div className="min-w-6 min-h-6 rounded-full bg-[#F1802E]"></div>
            <div className="text-sm">หลุดจอง</div>
          </div>
          <div className="flex items-center gap-1 col-span-1">
            <div className="min-w-6 min-h-6 rounded-full bg-[#90DCF8]"></div>
            <div className="text-sm">รออนุมัติ</div>
          </div>
          <div className="flex items-center gap-1 col-span-3">
            <div className="min-w-6 min-h-6 rounded-full bg-[#A6A6A6]"></div>
            <div className="text-sm">วันหยุด / เลยเวลาการจอง</div>
          </div>
        </div>
      </div>

      {rooms.map((roomName) => (
        <div key={roomName}>
          <h3 className="text-lg font-bold my-4">{roomName}</h3>
          <div className="bg-white shadow-md rounded-l p-6 border max-[350px]:px-1 max-[390px]:px-2">
            <div className="flex items-center justify-between mb-2 border-b pb-2">
              <button onClick={handlePrevWeek} className="p-2">
                <FiChevronLeft />
              </button>
              <h4 className="text-lg font-semibold">
                {format(currentWeek, "MMMM yyyy")}
              </h4>
              <button onClick={handleNextWeek} className="p-2">
                <FiChevronRight />
              </button>
            </div>

            <div className="grid grid-cols-8 mb-2 text-center items-center text-xs font-medium border-b relative">
              <div>Time</div>
              {days.map((day, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span
                    className={clsx("p-2 rounded-full", {
                      "bg-yellow-300": idx === 2,
                    })}
                  >
                    {format(day, "E")}
                  </span>
                  <span className="block mb-2">{format(day, "d")}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-8">
              <div className="flex flex-col items-center">
                {times.map((time) => (
                  <span key={time} className="p-2.5 w-full text-center text-xs">
                    {time}
                  </span>
                ))}
              </div>
              {days.map((day) => (
                <div
                  key={format(day, "yyyy-MM-dd")}
                  className="flex flex-col items-center"
                >
                  {times.map((time) => {
                    const status = getStatus(roomName, day, time);
                    return (
                      <div
                        key={time}
                        className={`w-7 h-7 rounded-full m-1 ${getColor(
                          status
                        )}`}
                      ></div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomStatus;
