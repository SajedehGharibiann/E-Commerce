import React, { useState } from "react";
import notify from "../../../Utils/notify";
import fetchData from "../../../Utils/fetchData";

export default function FirstStep({ phoneNumber, changePageType, changePhoneNumber }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetchData("auth", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ phoneNumber: phoneNumber }),
      });

      notify(response?.success ? "success" : "error", response?.message);
      if (response?.success) {
        changePageType(response?.data?.passwordExist ? "password" : "otp");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-20 p-10 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/40
                 shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex flex-col gap-7 transition-all duration-500
                 hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)]"
    >
      <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 
                     bg-clip-text text-transparent text-center tracking-tight">
        Welcome to my website
      </h2>

      <p className="text-gray-600 text-center text-sm tracking-wide">
        Please enter phone number
      </p>

      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => changePhoneNumber(e.target.value)}
        className="w-full px-5 py-3.5 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm 
                   focus:ring-4 focus:ring-blue-400/40 focus:border-blue-500 shadow-inner 
                   transition-all duration-300 placeholder-gray-400"
        placeholder="09xx xxx xxxx"
      />

      <button
        disabled={!phoneNumber || loading}
        className={`w-full py-3.5 rounded-xl font-semibold text-white text-lg tracking-wide transition-all duration-300
          ${!phoneNumber || loading
            ? "bg-gray-300 cursor-not-allowed shadow-none"
            : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.03] active:scale-[0.98]  shadow-[0_4px_20px_rgba(56,125,255,0.35)]"}`}>
        {loading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
}
