import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./style.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import notify from "../../../Utils/notify";
import fetchData from "../../../Utils/fetchData";
import SkMainSlider from "./SkMainSlider";

export default function MainSlider() {
  const [sliders, setSliders] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetchData("sliders");
        console.log(response)
        setSliders(response?.data)
      } catch (error) {
        console.log(error)
      }
    })();
  }, []);
  if(!sliders) return <SkMainSlider/>
  const items = sliders?.map((slider) => (
    <SwiperSlide key={slider?._id}>
      <img
        src={import.meta.env.VITE_FILE_URL + slider?.image}
        alt={slider?.title}
      />
      <p>{slider?.title}</p>
    </SwiperSlide>
  ));
  return (
    <>
      <section className="h-[50vh] w-[90%] my-[12px] mx-auto rounded-2xl shadow-2xl shadow-gray-500 overflow-hidden">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mainSlider"
        >
          {items}
        </Swiper>
      </section>
    </>
  );
}
