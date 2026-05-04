import React, { useEffect, useState } from "react";
import fetchData from "../../../Utils/fetchData";
import notify from "../../../Utils/notify";
import { useDispatch } from "react-redux";
import { login } from "../../../Store/Slice/AuthSlice";

export default function LoginOtp({
  phoneNumber,
  changePageType,
  changePhoneNumber,
}) {
  const [code, setCode] = useState("");
  const [resetTime, setResetTime] = useState(120);
  const [loading, setLoading] = useState(false);
  const disPatch=useDispatch()

  const formatTime = () => {
    const min = Math.floor(resetTime / 60);
    const sec = resetTime % 60;
    return `${min}: ${sec < 10 ? "0" + sec : sec}`;
  };

 const resendCode = async () => {
    setLoading(true);
    try {
      // Assuming fetchData is defined elsewhere and works correctly
      const response = await fetchData("auth/resend-code", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });

      console.log("Resend Code Response:", response);

      if (response?.data?.success) {
        setResetTime(120); // Reset timer on successful resend
      } else {
        console.error("Failed to resend code:", response?.message);
      }
    } catch (error) {
      console.error("Error resending code:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (resetTime <= 0) return;
    let timer = setInterval(() => {
      setResetTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Assuming fetchData is defined elsewhere and works correctly
      const response = await fetchData("auth/login-otp", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ phoneNumber, code }),
      });

       notify(
        response?.success ? "success" : "error", 
        response?.message
      );

      if(response?.success){
        disPatch(login(response?.data))
        changePageType("otp")
      }
      setLoading(false)
    } catch (error) {
      console.error("Error during login:");
      setLoading(false)
  };
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-xl p-6 sm:p-8 flex flex-col items-center">
        <h2
          className="text-3xl font-bold text-center text-transparent bg-clip-text
                       bg-gradient-to-r from-blue-600 to-purple-600 mb-4"
        >
          Login with OTP
        </h2>
        <form onSubmit={handleSubmit} className="w-full space-y-4 sm:space-y-6">
          {/* Phone Number Input */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              readOnly
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-200 text-gray-700 cursor-not-allowed"
              aria-describedby="phone-number-description"
            />
            <p
              id="phone-number-description"
              className="mt-1 text-xs text-gray-500"
            >
              This number cannot be changed.
            </p>
          </div>

          {/* OTP Code Input */}
          <div>
            <label
              htmlFor="otpCode"
              className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
            >
              Enter Code OTP
            </label>
            <input
              type="text"
              id="otpCode"
              value={code}
              placeholder="Enter 6-digit code..."
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              maxLength={6} // Assuming OTP is 6 digits
            />
          </div>

          {/* Resend Code Button */}
          <div>
            <button
              type="button"
              onClick={resendCode}
              disabled={resetTime > 0 || loading}
              className={`w-full py-2 sm:py-3 rounded-md font-semibold transition duration-200 ease-in-out
                ${
                  resetTime > 0 || loading
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                }`}
            >
              {loading
                ? "Sending..."
                : resetTime > 0
                  ? `Resend in ${formatTime()}`
                  : "Resend Code"}
            </button>
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              disabled={loading || !phoneNumber || !code}
              className={`w-full py-2 sm:py-3 rounded-md font-semibold transition duration-200 ease-in-out
                ${
                  loading || !phoneNumber || !code
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        {/* Switch Page Link */}
        <div className="mt-6 sm:mt-8 w-full text-center">
          <span
            onClick={() => changePageType("password")}
            className="text-sm sm:text-base text-blue-600 hover:text-blue-700 font-medium cursor-pointer transition duration-200 ease-in-out"
          >
            Or login with password
          </span>
        </div>
      </div>
    </div>
  );
}
