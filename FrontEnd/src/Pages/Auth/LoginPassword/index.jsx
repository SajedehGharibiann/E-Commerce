import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import ForgotPassword from "../ForgotPassword"; // Assuming this is correctly imported
import fetchData from "../../../Utils/fetchData"; // Assuming this is correctly imported
import { useDispatch } from "react-redux";
import { login } from "../../../Store/Slice/AuthSlice";

// Assume notify function is available in scope or imported elsewhere
// import notify from "../../../Utils/notify"; 

export default function LoginPassword({
  phoneNumber,
  changePageType,
  changePhoneNumber, // This prop is not used in the provided code, but kept for consistency
}) {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState(""); 
  const disPatch = useDispatch();


   const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetchData("auth/login-password", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ phoneNumber, password }),
      });
      
      console.log("Login Response:", response); 

      if (response?.success) {
        disPatch(login(response?.data)); 
        changePageType("otp")
      }
      
    } catch (error) {
      console.error("Error during login:", error);
    
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async () => {
    setLoading(true); // Indicate loading state
    try {
      const response = await fetchData("auth/resend-code", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });
      
      // Assuming notify is globally available or imported
      // notify(response?.success ? "success" : "error", response?.message); 
      console.log("Resend Code Response:", response); // For debugging

      if (response?.success) { // Check response.data for success
        changePageType("otp");
      } else {
        // Handle specific error message if available
        // notify("error", response?.message || "Failed to resend code.");
      }
      
    } catch (error) {
      console.error("Error resending code:", error);
      // notify("error", "An error occurred. Please try again.");
    } finally {
      setLoading(false); // Always stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      {/* Subtle background animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-300 via-blue-200 to-purple-200 opacity-20 blur-xl animate-tilt"></div>
      </div>

      <form 
        onSubmit={handleSubmit} 
        className="relative z-10 w-full max-w-md p-8 rounded-3xl backdrop-blur-lg
                   bg-white/70 border border-white/50
                   shadow-lg flex flex-col gap-6 transition-all duration-500 hover:shadow-xl"
      >
        <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text
                       bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
          Enter Your Password
        </h2>

        <div className="flex flex-col gap-3">
          {/* Phone Number Display */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="phoneNumberDisplay" className="text-sm font-medium text-gray-600 ml-1">
              Phone Number
            </label>
            <div 
              id="phoneNumberDisplay" // Added ID for label association
              className="p-4 rounded-xl bg-blue-50 border border-gray-200 text-gray-700 font-medium shadow-sm"
            >
              {phoneNumber}
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="passwordInput" className="text-sm font-medium text-gray-600 ml-1">
              Password
            </label>
            <input
              id="passwordInput" // Added ID for label association
              type="password"
              placeholder="Enter your password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 rounded-xl bg-white text-gray-800
                         placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:bg-white
                         outline-none border border-gray-200 transition-all duration-300 shadow-sm"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <button
            type="submit"
            disabled={loading || !password}
            className={`w-full py-4 rounded-xl text-white font-bold uppercase
              tracking-wider transition duration-300 ease-in-out shadow-lg
              ${loading || !password 
                ? "bg-gray-300 cursor-not-allowed shadow-none" 
                : "bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              }`}
          >
            {loading ? "Authenticating..." : "Login"}
          </button>

          <div className="flex justify-between text-sm font-medium text-gray-600">
            <span
              onClick={resendCode}
              className="text-blue-600 hover:text-blue-500 hover:underline cursor-pointer transition duration-300"
            >
              Login with OTP
            </span>
            <span 
              onClick={() => changePageType("forgot")} 
              className="text-purple-600 hover:text-purple-500 hover:underline cursor-pointer transition duration-300"
            >
              Forgot password?
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
