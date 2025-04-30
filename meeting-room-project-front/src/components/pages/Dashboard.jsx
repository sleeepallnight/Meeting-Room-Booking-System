import React from "react";
import { Chart } from "react-google-charts";

const bookings = [
  {
    room: "Meeting Room 1",
    times: [null, "651074262", null, "651074263", null, null],
  },
  {
    room: "Meeting Room 2",
    times: ["651074264", null, null, null, null, null],
  },
  {
    room: "Meeting Room 3",
    times: [null, null, "651074265", "651074265", "651074265", null],
  },
  { room: "Meeting Room 4", times: [null, null, null, null, null, null] },
  {
    room: "Meeting Room 5",
    times: [null, "651074266", "651074266", null, "651074267", null],
  },
];

const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* แถว 1 */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mb-6 text-center">
        {[
          ["การจองทั้งหมด", 3],
          ["การจองวันนี้", 3],
          ["รอการอนุมัติ", 3],
          ["จำนวนห้องประชุม", 3],
        ].map(([title, value], index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow">
            <p className="font-bold mb-2">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
          </div>
        ))}
        <div className="bg-white rounded-lg p-4 text-left">
          <p className="font-bold mb-2">เวลาทำการ</p>
          <div>
            <div className="flex justify-between">
              <p>จันทร์-ศุกร์</p>
              <p>8:00 - 18:00 น.</p>
            </div>
            <div className="flex justify-between">
              <p>เสาร์-อาทิตย์</p>
              <p>ปิดทำการ</p>
            </div>
          </div>
        </div>
      </div>

      {/* แถว 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {/* ตารางแสดงการจองห้อง */}
        <div className="bg-white rounded-lg col-span-2 p-4 text-left">
          <p className="font-bold text-lg">ตารางแสดงการจองห้อง</p>
          <p className="text-gray-500 text-sm mt-1 mb-3">
            วันที่ 1 ตุลาคม 2567
          </p>

          <div className="overflow-auto max-w-full max-h-75 border border-gray-300 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <table className="w-full text-sm border border-gray-300 min-w-175 min-h-50">
              <thead>
                <tr className="">
                  <th className="p-2 text-center">ห้องประชุม/เวลา</th>
                  {[
                    "09:00-10:00",
                    "11:00-12:00",
                    "12:00-13:00",
                    "13:00-14:00",
                    "14:00-15:00",
                    "16:00-17:00",
                  ].map((time, index) => (
                    <th key={index} className="p-2 text-center">
                      {time}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.map(({ room, times }, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{room}</td>
                    {times.map((booking, idx) => (
                      <td
                        key={idx}
                        className={`border border-gray-300 p-2 text-center ${
                          booking ? "bg-[#F9E193]" : ""
                        }`}
                      >
                        {booking && (
                          <div>
                            <p className="text-[#8A2A2B] font-bold">
                              {booking}
                            </p>
                            <p className="text-[#333333] text-sm">
                              {
                                [
                                  "09:00-10:00",
                                  "11:00-12:00",
                                  "12:00-13:00",
                                  "13:00-14:00",
                                  "14:00-15:00",
                                  "16:00-17:00",
                                ][idx]
                              }
                            </p>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* การจองล่าสุด */}
        <div className="bg-white rounded-lg p-4">
          <p className="font-bold text-lg mb-2">การจองล่าสุด</p>
          <div className="overflow-auto max-h-80 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidde">
            {[
              ["651074262", "Pending", "1 Oct 2024"],
              ["651074263", "Rejected", "1 Oct 2024"],
              ["651074264", "Approved", "1 Oct 2024"],
              ["651074264", "Pending", "1 Oct 2024"],
              ["651074264", "Approved", "1 Oct 2024"],
              ["651074264", "Rejected", "1 Oct 2024"],
              ["651074264", "Approved", "1 Oct 2024"],
              ["651074264", "Rejected", "1 Oct 2024"],
              ["651074264", "Pending", "1 Oct 2024"],
              ["651074264", "Approved", "1 Oct 2024"],
            ].map(([id, status, date], index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2"
              >
                <span className="text-sm">{id}</span>
                <span
                  className={`px-2 py-1 text-xs font-bold rounded ${
                    status === "Pending"
                      ? "bg-gray-300 text-gray-700"
                      : status === "Rejected"
                      ? "bg-red-200 text-red-700"
                      : "bg-green-200 text-green-700"
                  }`}
                >
                  {status}
                </span>
                <span className="text-sm text-gray-500">{date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ประเภทผู้ใช้งาน */}
        <div className="bg-white rounded-lg p-4">
          <p className="font-bold text-lg mb-2">ประเภทผู้ใช้งาน</p>
          <Chart
            width={"100%"}
            height={"250px"}
            chartType="PieChart"
            loader={<div>Loading Chart...</div>}
            data={[
              ["ประเภท", "จำนวน"],
              ["อาจารย์", 33],
              ["นักศึกษา", 67],
            ]}
            options={{
              pieHole: 0,
              legend: { position: "bottom" },
            }}
          />
        </div>
      </div>

      {/* แถว 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-4">
          <p className="font-bold text-lg mb-2">
            กราฟสรุปจำนวนการจองห้องประชุม
          </p>
          <Chart
            width={"100%"}
            height={"250px"}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={[
              ["เดือน", "จำนวนจอง"],
              ["JAN", 30],
              ["FEB", 40],
              ["MAR", 35],
              ["APR", 50],
              ["MAY", 30],
              ["JUN", 45],
            ]}
            options={{
              hAxis: { title: "เดือน" },
              vAxis: { title: "จำนวนจอง" },
              legend: { position: "none" },
            }}
          />
        </div>

        <div className="bg-white rounded-lg p-4">
          <p className="font-bold text-lg mb-2">
            กราฟเปรียบเทียบความนิยมห้องประชุม
          </p>
          <Chart
            width={"100%"}
            height={"250px"}
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={[
              ["ห้อง", "ความนิยม"],
              ["Meeting Room 1", 15],
              ["Meeting Room 2", 10],
              ["Meeting Room 3", 7],
            ]}
            options={{
              hAxis: { title: "ห้องประชุม" },
              vAxis: { title: "ความนิยม" },
              legend: { position: "none" },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
