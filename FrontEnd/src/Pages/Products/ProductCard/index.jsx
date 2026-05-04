import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  title,
  categoryTitle,
  brandTitle,
  image,
  price,
  priceAfterDiscount,
  discountPercent,
  id,
  avgRating,
}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate(`/product-details/${id}/${title.replaceAll(" ", "-")}`)
      }
      className="
        bg-white shadow-sm rounded-xl overflow-hidden cursor-pointer 
        border border-gray-100 
        hover:shadow-xl hover:-translate-y-1 
        transition-all duration-300 group
      "
    >
      {/* Discount badge */}
      {discountPercent > 0 && (
        <span
          className="
            absolute mt-3 ml-3 z-10 
            bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md
          "
        >
          -{discountPercent}%
        </span>
      )}

      {/* Image */}
      <div className="h-52 bg-gray-50 flex justify-center items-center overflow-hidden">
        <img
          src={image}
          alt={title}
          className="
            h-full object-contain 
            transition duration-300 group-hover:scale-110
          "
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-sm font-semibold text-gray-800 line-clamp-2 min-h-[40px]">
          {title}
        </h2>

        <p className="text-xs text-gray-500 mt-1">
          Category: <span className="font-medium">{categoryTitle}</span>
        </p>
        <p className="text-xs text-gray-500">
          Brand: <span className="font-medium">{brandTitle}</span>
        </p>

        {/* Rating */}
        <p className="text-xs text-yellow-500 mt-1">
          ⭐ {avgRating || 0} / 5
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-lg font-bold text-blue-600">
            ${priceAfterDiscount}
          </span>

          {discountPercent > 0 && (
            <del className="text-sm text-gray-400">${price}</del>
          )}
        </div>
      </div>
    </div>
  );
}