import React from "react";
import { useNavigate } from "react-router-dom";

export default function CardCategory({ image, id, title }) {
    const navigate=useNavigate()
  return (
    <div onClick={()=>navigate(`/products/${id}/${title.replaceAll(" ","-")}`)}
      className="group relative overflow-hidden rounded-2xl bg-white/80
                 border border-slate-100 shadow-md
                 hover:shadow-xl hover:-translate-y-1 hover:border-blue-100
                 transition-all duration-300 cursor-pointer"
    >
     
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100
                   bg-gradient-to-br from-blue-50/80 via-transparent to-purple-50/70
                   transition-opacity duration-300"
      />

      <div className="relative flex flex-col items-center px-4 pt-4 pb-5">
   
        <div
          className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden
                     bg-slate-100 shadow-sm
                     group-hover:shadow-lg group-hover:-translate-y-0.5
                     transition-all duration-300"
        >
          <img
            src={import.meta.env.VITE_FILE_URL+ image}
            alt={title}
            className="w-full h-full object-cover
                       group-hover:scale-105 transition-transform duration-300"
          />
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl
                       ring-0 ring-blue-400/0 group-hover:ring-2 group-hover:ring-blue-400/40
                       transition-all duration-300"
          />
        </div>

       
        <h3
          className="mt-3 text-sm md:text-base font-semibold text-slate-800
                     text-center line-clamp-1
                     group-hover:text-blue-700 transition-colors duration-200"
        >
          {title}
        </h3>

       
        <p className="mt-1 text-[11px] text-slate-400 tracking-wide uppercase">
          Category
        </p>

       
        <div
          className="mt-3 h-0.5 w-10 rounded-full bg-slate-100
                     group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500
                     transition-all duration-300"
        />
      </div>
    </div>
  );
}
