import React, { useEffect, useState } from "react";
import useFormFields from "../../../Hook/useFormFields";
import fetchData from "../../../Utils/fetchData";
import notify from "../../../Utils/notify";

export default function ForgotPassword({ changePageType }) {
  const [fields, handleChange, setFields] = useFormFields({
    phoneNumber: "",
    code: "",
    newPassword: "",
  });

  const [resendTime, setResendTime] = useState(120);
  const [loading, setLoading] = useState(false);

  const formatTime = () => {
    const min = Math.floor(resendTime / 60);
    const sec = resendTime % 60;
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
  };
  useEffect(() => {
    if (resendTime <= 0) return;
    const timer = setInterval(() => {
      setResendTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTime]);
  const resendCode = async () => {
    setLoading(true)
    setFields({...fields,code:""})
    try {
      const response = await fetchData("auth/resend-code", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ phoneNumber: fields.phoneNumber }),
      });

      notify(response?.success ? "success" : "error", response?.message);

      if (response?.success) {
        setResendTime(120);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetchData("auth/forget-password", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(fields),
      });

      notify(
        response?.success ? "success" : "error",
        response?.message,
      );

      if (response?.success) {
        changePageType("first");
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_#172554_0%,_#0f172a_35%,_#020617_100%)] px-4 py-10">
      <div className="absolute left-[-100px] top-[-80px] h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-80px] h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />

      <div className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-white/10 bg-white/10 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent pointer-events-none" />

        <div className="relative mb-8 text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-[28px] border border-white/20 bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 shadow-[0_10px_40px_rgba(59,130,246,0.35)]">
            <span className="text-3xl text-white">🔑</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            Reset Password
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Verify your phone number and set a new password to access your
            account again.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              Phone Number
            </label>
            <div className="rounded-2xl border border-white/10 bg-white/5 shadow-inner shadow-black/10 transition duration-300 focus-within:border-cyan-400 focus-within:bg-white/10 focus-within:ring-2 focus-within:ring-cyan-500/30">
              <input
                type="text"
                name="phoneNumber"
                value={fields.phoneNumber}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full bg-transparent px-4 py-3 text-white placeholder:text-slate-400 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              OTP Code
            </label>
            <div className="rounded-2xl border border-white/10 bg-white/5 shadow-inner shadow-black/10 transition duration-300 focus-within:border-cyan-400 focus-within:bg-white/10 focus-within:ring-2 focus-within:ring-cyan-500/30">
              <input
                type="text"
                name="code"
                value={fields.code}
                placeholder="Enter OTP code..."
                onChange={handleChange}
                className="w-full bg-transparent px-4 py-3 text-center text-lg font-semibold tracking-[0.3em] text-white placeholder:tracking-normal placeholder:text-slate-400 outline-none"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={resendCode}
            disabled={resendTime > 0}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200 transition duration-300 hover:border-cyan-400/40 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {resendTime > 0 ? `Resend in ${formatTime()}` : "Resend Code"}
          </button>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              New Password
            </label>
            <div className="rounded-2xl border border-white/10 bg-white/5 shadow-inner shadow-black/10 transition duration-300 focus-within:border-violet-400 focus-within:bg-white/10 focus-within:ring-2 focus-within:ring-violet-500/30">
              <input
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                value={fields.newPassword}
                onChange={handleChange}
                className="w-full bg-transparent px-4 py-3 text-white placeholder:text-slate-400 outline-none"
              />
            </div>
          </div>

          <button
            disabled={
              loading ||
              !fields.phoneNumber ||
              !fields.code ||
              !fields.newPassword
            }
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 px-4 py-3.5 font-semibold text-white shadow-[0_12px_35px_rgba(59,130,246,0.35)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_16px_45px_rgba(59,130,246,0.45)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>

          <div className="pt-2 text-center">
            <span
              onClick={() => changePageType("password")}
              className="cursor-pointer text-sm font-medium text-cyan-300 transition duration-300 hover:text-white"
            >
              Back to login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
