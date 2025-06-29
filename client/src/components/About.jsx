import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight, Import } from "lucide-react";
import ReactLogo from "../assets/react.svg";
import techyguy from "../assets/techy.png"
import mern from "../assets/MERN.png"
import exp from "../assets/EXPLORE.png"

import "swiper/css";
import "swiper/css/navigation";

// Inject Orbitron font into document
const orbitronLink = document.createElement("link");
orbitronLink.href = "https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&display=swap";
orbitronLink.rel = "stylesheet";
document.head.appendChild(orbitronLink);

const carouselData = [
  {
    title: "Who am I?",
    image: techyguy,
    content: "im a tech Enthusiast who loves to explore the techy world around me"
  },
  {
    title: "What I do?",
    image: mern,
    content: "currently i'm a mern stack developer and undergoing my UG degree"
  },
  {
    title: "What I like?",
    image: exp,
    content: "im more into tech i love exploring it, its fun right??? "
  }

];

export default function AboutCarousel() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="about" className="min-h-[90vh] w-full flex flex-col items-center justify-center px-6 md:px-16 bg-gradient-to-tr from-white via-gray-100 to-slate-200 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-500">
      <h2
        className="text-3xl font-semibold mb-10 text-center dark:text-white text-gray-900"
        style={{ fontFamily: "Orbitron, sans-serif" }}
      >
        About Me
      </h2>

      <div className="w-full  relative">
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next"
          }}
          spaceBetween={50}
          slidesPerView={1}
          className="w-full h-[75vh]"
        >
          {carouselData.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative w-full h-full rounded-[2rem] overflow-hidden border border-gray-300 dark:border-gray-700 shadow-xl"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full h-full object-cover transition-all duration-500 ${hoveredIndex === index ? "scale-105 blur-sm" : ""}`}
                />
                <div className="absolute inset-0 flex items-end">
                  <div
                    className={`
                      w-full px-6 py-6 transition-all duration-700 ease-in-out
                      ${hoveredIndex === index ? "translate-y-0" : "translate-y-[100%]"}
                      bg-white/30 dark:bg-black/30 backdrop-blur-[10px] text-gray-900 dark:text-white
                      rounded-t-md
                    `}
                    style={{
                      fontFamily: "Orbitron, sans-serif",
                      transitionProperty: "transform, background-color, opacity"
                    }}
                  >
                    <h3 className="text-2xl font-bold mb-2 text-center">{item.title}</h3>
                    <p className="text-lg md:text-xl font-medium text-center">{item.content}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Arrows */}
        <button className="custom-prev absolute left-[-2rem] top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur hover:bg-white/50 dark:hover:bg-black/50 z-10">
          <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>
        <button className="custom-next absolute right-[-2rem] top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur hover:bg-white/50 dark:hover:bg-black/50 z-10">
          <ChevronRight className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>
      </div>
    </section>
  );
}
