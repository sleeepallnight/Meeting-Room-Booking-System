import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../Assets/TSE_LOGO.png";

function Login() {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const payload = {
      UserName: userName,
      PassWord: passWord,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        payload
      );

      if (response.data.success) {
        localStorage.setItem("userData", JSON.stringify(response.data.data[0]));
        localStorage.setItem("token", "user");
        setMessage("Login สำเร็จ");

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setMessage("ชื่อผู้ใช้หรือรหัสผ่านผิด");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("ชื่อผู้ใช้หรือรหัสผ่านผิด");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-6">
      {/* Logo */}
      <div className="flex justify-center">
        <img className="w-100" src={logo} alt="TSE Logo" />
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center -mt-18">
        <div className="w-full max-w-md bg-white p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
            TSE Meeting Room
          </h2>
          <p className="text-lg font-semibold text-gray-600 text-center mb-6">
            Sign in
          </p>

          {/* Form */}
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                TSE ID
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-3 bg-[#EBEDF1] rounded-md focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={passWord}
                onChange={(e) => setPassWord(e.target.value)}
                className="w-full p-3 bg-[#EBEDF1] rounded-md focus:outline-none"
              />
            </div>
          </div>

          {/* Button */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-3">
              จองล่วงหน้าอย่างน้อย 1 วัน
            </p>
            <button
              onClick={handleLogin}
              className="w-31 bg-[#8A2A2B] text-white py-2 rounded-md text-lg font-semibold hover:bg-[#621d1e]"
            >
              Sign In
            </button>

            {/* Message */}
            {message && (
              <p className="mt-4 text-sm text-center text-red-600">{message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
