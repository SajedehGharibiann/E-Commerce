import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";

import fetchData from "../../../Utils/fetchData";
import SaleSectionCard from "./SaleSectionCard";

export default function SaleSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchData(
          "product-variants?sort=-discountPercent&limit=10&populate=productId"
        );
        setProducts(response?.data || []);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="w-full px-2 md:px-4">
      <Swiper
        spaceBetween={16}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        freeMode={true}
        centeredSlides={false}
        modules={[FreeMode, Pagination, Autoplay]}
        className="SaleSection-products-swiper py-6"
        breakpoints={{
          0: { slidesPerView: 1.3, spaceBetween: 16 },
          600: { slidesPerView: 2.2, spaceBetween: 18 },
          1024: { slidesPerView: 3.2, spaceBetween: 20 },
          1280: { slidesPerView: 4, spaceBetween: 24 },
        }}
      >
        {products?.map((e, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <SaleSectionCard
              ratingCount={e?.productId?.ratingCount}
              avgRating={e?.productId?.avgRating}
              title={e?.productId?.title}
              description={e?.productId?.description}
              image={e?.productId?.images?.at(0)}
              quantity={e?.productId?.quantity}
              price={e?.price}
              discountPercent={e?.discountPercent}
              priceAfterDiscount={e?.priceAfterDiscount}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
