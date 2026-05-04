import React from "react";

export default function SkMainSlider() {
  return (
    <section className="my-12 mx-auto h-[70vh] w-[90%] overflow-hidden rounded-2xl shadow-2xl shadow-gray-500">
      <div className="relative h-full w-full animate-pulse bg-slate-300">
        <div className="h-full w-full bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300" />

        <div className="absolute left-1/2 top-1/2 h-14 w-64 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white/30 backdrop-blur-sm" />

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3">
          <span className="h-3 w-3 rounded-full bg-white/50" />
          <span className="h-3 w-3 rounded-full bg-white/30" />
          <span className="h-3 w-3 rounded-full bg-white/30" />
        </div>

        <div className="absolute left-4 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-white/30" />
        <div className="absolute right-4 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-white/30" />
      </div>
    </section>
  );
}