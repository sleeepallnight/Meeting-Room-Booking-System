import React, { useState } from "react";

const Setting = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  const handleNotificationToggle = () => {
    setNotificationEnabled(!notificationEnabled);

    console.log("Notification toggled:", !notificationEnabled);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <div>
        {/* header */}
        <div className="text-xl font-bold mb-6">Setting</div>

        {/* notification */}
        <div className="mb-4  pb-4">
          <h3 className="text-lg mb-6 w-30 text-center p-1 rounded-lg font-semibold bg-[#DDDDDD]">
            notification
          </h3>
          <div className="flex items-center justify-between px-2 py-2 rounded-lg bg-[#F3F3F3]">
            <span>Enable Notification</span>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={notificationEnabled}
                onChange={handleNotificationToggle}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-400"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
