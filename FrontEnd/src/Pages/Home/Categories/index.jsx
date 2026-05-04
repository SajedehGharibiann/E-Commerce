import React, { useEffect, useState } from "react";
import fetchData from "../../../Utils/fetchData";
import CardCategory from "./CardCategory";

export default function Categories() {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchData("categories?limit=10&page=1");
        setCategories(response?.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const items = categories?.map((e, index) => (
    <CardCategory
      key={index}
      title={e?.title}
      id={e?._id}
      image={e?.image}
    />
  ));

  return (
    <section className="relative w-full py-16 px-4 md:px-8 lg:px-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0  -z-10" />

      <div className="max-w-7xl mx-auto">

        {/* ===== Header ===== */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold 
                         bg-gradient-to-r from-blue-600 to-purple-600 
                         text-transparent bg-clip-text">
            Our Categories
          </h2>

          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            Discover products organized into carefully curated categories
          </p>

          {/* Decorative Divider */}
          <div className="mt-6 flex justify-center">
            <div className="h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
          </div>
        </div>

        {/* ===== Content Wrapper ===== */}
        <div className="bg-white/70 backdrop-blur-md 
                        border border-gray-100 
                        rounded-3xl shadow-xl 
                        p-6 md:p-10">

          {!categories ? (
            /* ===== Loading Skeleton ===== */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="h-40 rounded-2xl 
                             bg-gradient-to-br from-gray-100 to-gray-200 
                             animate-pulse"
                />
              ))}
            </div>
          ) : categories.length === 0 ? (
            /* ===== Empty State ===== */
            <div className="flex flex-col items-center justify-center text-center py-16">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <span className="text-3xl">📂</span>
              </div>

              <p className="text-xl font-semibold text-gray-700 mb-2">
                No Categories Available
              </p>

              <p className="text-gray-500 max-w-sm">
                It looks like there are no categories at the moment.
                Please check back later.
              </p>
            </div>
          ) : (
            /* ===== Categories Grid ===== */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {items}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
