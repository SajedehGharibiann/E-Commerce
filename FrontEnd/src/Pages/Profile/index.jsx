import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchData from "../../Utils/fetchData";
import notify from "../../Utils/notify";
import { logout, updateUser } from "../../Store/Slice/AuthSlice";

export default function Profile() {
  const { user, token } = useSelector((state) => state.auth);
  const [fullName, setFullName] = useState(user.fullName);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Accent color - a calm, sophisticated blue
  const accentColor = "text-blue-600";
  const accentHoverColor = "hover:bg-blue-700";
  const accentBorderColor = "focus:ring-blue-500";

  const handleUpdateUser = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await fetchData(`users/${user._id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Berar ${token}`, // Assuming 'Berar' is a typo and should be 'Bearer'
        },
        body: JSON.stringify({ fullName }),
      });
      if (response?.success) {
        dispatch(updateUser(response?.data));
      }
      notify(response?.success ? "success" : "error", response?.message);
    } catch (error) {
      console.log(error);
      notify("error", "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await fetchData(`users/change-password`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Berar ${token}`, // Assuming 'Berar' is a typo and should be 'Bearer'
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      notify(response?.success ? "success" : "error", response?.message);
    } catch (error) {
      console.log(error);
      notify("error", "An error occurred. Please try again.");
    } finally {
      setLoading(false);
      setOldPassword("");
      setNewPassword("");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    // Optionally, redirect the user after logout
    // window.location.href = '/login'; // Or use react-router-dom's navigate
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12 w-[40%] ">
        <h2 className="text-3xl mb-6 font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 
                     bg-clip-text text-transparent text-center tracking-tight">
          Profile Settings
        </h2>

        {/* Update User Form */}
        <form onSubmit={handleUpdateUser} className="mb-12 space-y-6">
          <h3 className={`text-xl font-semibold ${accentColor} mb-4`}>
            User Information
          </h3>
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
              placeholder="Enter your full name"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 rounded-xl font-semibold text-white text-lg tracking-wide transition-all duration-300 ${
              loading ? "bg-gray-300 cursor-not-allowed shadow-none" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:cursor-pointer active:scale-[0.98]  shadow-[0_4px_20px_rgba(56,125,255,0.35)]"
            } `}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>

        {/* Change Password Form */}
        <form onSubmit={handleUpdatePassword} className="space-y-6">
          <h3 className={`text-xl font-semibold ${accentColor} mb-4`}>
            Security Settings
          </h3>
          <div>
            <label
              htmlFor="oldPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Old Password
            </label>
            <input
              id="oldPassword"
              type="password"
              value={oldPassword}
              placeholder="Enter your old password..."
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
            />
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              placeholder="Enter your new password..."
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
            />
          </div>
         <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 rounded-xl font-semibold text-white text-lg tracking-wide transition-all duration-300 ${
              loading ? "bg-gray-300 cursor-not-allowed shadow-none" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:cursor-pointer active:scale-[0.98]  shadow-[0_4px_20px_rgba(56,125,255,0.35)]"
            } `}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        {/* Logout Button */}
        <div className="mt-12 text-center">
          <button
            onClick={handleLogout}
            className=" bg-red-700 w-full py-3.5 rounded-xl text-white hover:cursor-pointer font-semibold transition duration-200 ease-in-out"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
