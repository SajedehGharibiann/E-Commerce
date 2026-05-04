import React from "react";

export default function SaleSectionCard({
  id,
  ratingCount,
  avgRating,
  title,
  description,
  image,
  quantity,
  price,
  discountPercent,
  priceAfterDiscount,
}) {
  return (
    <div
      className="w-[230px] sm:w-[250px] md:w-[260px]
                 group bg-white rounded-2xl border border-gray-100
                 shadow-md hover:shadow-xl hover:-translate-y-1
                 transition-all duration-300 overflow-hidden"
    >
      {discountPercent > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-red-500 to-pink-500
                        text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          -{discountPercent}%
        </div>
      )}

      <div className="w-full h-48 bg-gray-50 overflow-hidden">
        <img
          src={import.meta.env.VITE_FILE_URL+image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 
                     transition-transform duration-300"
        />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-sm md:text-base font-semibold text-gray-800 line-clamp-1">
          {title}
        </h3>

        <p className="text-xs text-gray-500 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center gap-1 text-sm">
          <span className="text-yellow-400">★</span>
          <span className="font-medium text-gray-700">{avgRating || 0}</span>
          <span className="text-gray-400 text-xs">
            ({ratingCount || 0})
          </span>
        </div>

        <div className="flex items-end justify-between mt-2">
          <div className="flex flex-col leading-tight">
            {discountPercent > 0 ? (
              <>
                <span className="text-xs text-gray-400 line-through">${price}</span>
                <span className="text-lg font-bold text-red-600">
                  ${priceAfterDiscount}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-800">${price}</span>
            )}
          </div>

          <span
            className={`text-xs font-medium ${
              quantity > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {quantity > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>
    </div>
  );
}
