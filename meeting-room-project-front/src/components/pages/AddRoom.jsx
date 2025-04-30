import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
  const [addRoomData, setAddRoomData] = useState({
    roomNameTH: "",
    roomNameEN: "",
    building: "",
    seat: "",
    size: "",
    location: "",
    capacity: "",
    note: "",
    branch: "RANGSIT",
    status: 0,
  });

  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddRoomData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSave = async () => {
    if (!image) {
      alert("กรุณาอัปโหลดรูปภาพ");
      return;
    }

    const roomData = {
      ...addRoomData,
      seat: parseInt(addRoomData.seat, 10),
      status: parseInt(addRoomData.status, 10),
      roomImage: image.name,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/rooms/addRoom",
        roomData
      );

      if (response.data.success) {
        clearForm();
        navigate("/admin/manageroom");
      } else {
        alert("ไม่สามารถเพิ่มห้องได้");
      }
    } catch (error) {
      console.error("Error uploading room:", error);
      alert("เกิดข้อผิดพลาดในการบันทึกห้อง");
    }
  };

  const clearForm = () => {
    setAddRoomData({
      roomNameTH: "",
      roomNameEN: "",
      building: "",
      seat: "",
      size: "",
      location: "",
      capacity: "",
      note: "",
      branch: "RANGSIT",
      status: 0,
    });
    setImage(null);
  };

  return (
    <div className="bg-[#EBEDF1] min-h-[92vh] flex justify-center items-start py-10">
      <div className="p-10 bg-white w-[94%] max-w-[94%] min-h-[80vh] shadow-md">
        <h1 className="text-[#8A2A2B] text-xl font-bold mb-10">
          เพิ่มห้องประชุม
        </h1>

        <div className="flex flex-col xl:flex-row gap-10">
          {/* Upload Image */}
          <div className="flex flex-col pr-7">
            <div className="bg-[#D9D9D9] w-90 h-65">
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Uploaded"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <input
              type="file"
              onChange={handleImageChange}
              className="hidden"
              id="imageUpload"
            />
            <label
              htmlFor="imageUpload"
              className="w-90 h-10 mt-7 text-white font-medium bg-[#3B65FB] flex items-center cursor-pointer rounded-md"
            >
              <FaCloudUploadAlt className="bg-[#4880FF] p-2 w-10 h-10 rounded-l-md" />
              <p className="flex-1 text-center">UPLOAD</p>
            </label>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
            {[
              { label: "หมายเลขห้อง TH", name: "roomNameTH" },
              { label: "หมายเลขห้อง EN", name: "roomNameEN" },
              { label: "อาคาร", name: "building" },
              { label: "ชั้น / ห้อง", name: "location" },
              { label: "ขนาดห้อง", name: "size" },
              { label: "จำนวนที่นั่ง", name: "seat" },
              { label: "จำนวนคนที่แนะนำ", name: "capacity" },
              { label: "เหตุผล", name: "note" },
            ].map((field) => (
              <div key={field.name}>
                <label className="font-bold block mb-2">{field.label}</label>
                <input
                  className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  type="text"
                  name={field.name}
                  value={addRoomData[field.name]}
                  onChange={handleChange}
                />
              </div>
            ))}

            <div>
              <label className="font-bold block mb-2">สถานะห้อง</label>
              <select
                className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                name="status"
                value={addRoomData.status}
                onChange={handleChange}
              >
                <option value={0}>เปิดใช้งาน</option>
                <option value={1}>ปิดใช้งาน</option>
              </select>
            </div>

            <div>
              <label className="font-bold block mb-2">ศูนย์</label>
              <select
                className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                name="branch"
                value={addRoomData.branch}
                onChange={handleChange}
              >
                <option value="RANGSIT">RANGSIT</option>
                <option value="PATTAYA">PATTAYA</option>
              </select>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={() => navigate("/admin/manageroom")}
            className="py-1.5 w-28 font-medium text-white bg-gray-400 hover:bg-gray-500 rounded-md shadow-md cursor-pointer"
          >
            CANCEL
          </button>
          <button
            onClick={handleSave}
            className="py-1.5 w-28 font-medium text-white bg-[#3B65FB] hover:bg-[#2b4fb0] rounded-md shadow-md cursor-pointer"
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoom;
