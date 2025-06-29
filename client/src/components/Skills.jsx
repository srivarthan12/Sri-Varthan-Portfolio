import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get("https://sri-varthan-portfolio-1.onrender.com/api/skills");
        setSkills(res.data);
      } catch (err) {
        console.error("Error fetching skills:", err);
      }
    };
    fetchSkills();
  }, []);

  return (
<section id="skills" className="px-4 md:px-10 pt-20 pb-6 bg-gradient-to-br from-white via-gray-100 to-slate-200 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-500 font-['Orbitron',sans-serif]">
  <h2 className="text-3xl font-bold mb-4 text-center dark:text-white text-gray-900">
    My Skills
  </h2>
  <div className="relative">
    <Swiper
      modules={[Navigation]}
      navigation={{
        nextEl: ".swiper-button-next-custom",
        prevEl: ".swiper-button-prev-custom",
      }}
      spaceBetween={20}
      breakpoints={{
        320: { slidesPerView: 1 },
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="px-2"
    >
      {skills.map((skill) => (
        <SwiperSlide key={skill._id}>
          <div className="relative group bg-white/10 dark:bg-white/5 backdrop-blur rounded-2xl shadow-lg overflow-hidden h-[32rem]">
            <img
              src={skill.image}
              alt={skill.name}
              className="w-full h-full object-cover absolute top-0 left-0 z-0"
            />
            <div className="absolute left-0 bottom-0 w-full h-1/3 group-hover:h-full bg-black/50 backdrop-blur-lg text-white p-6 z-10 transition-all duration-500 ease-in-out rounded-2xl flex flex-col justify-start group-hover:justify-center">
              <h3 className="text-xl font-semibold mb-4 text-center">{skill.name}</h3>
              <div className="w-full h-3 bg-white/40 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-500"
                  style={{ width: `${skill.percent}%` }}
                ></div>
              </div>
              <p className="mt-2 text-sm font-medium text-right">{skill.percent}%</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>

    {/* Swiper arrows */}
    <div className="absolute top-1/2 -translate-y-1/2 -left-4 z-10">
      <button className="swiper-button-prev-custom p-2 rounded-full bg-white/10 backdrop-blur hover:bg-white/20 transition">
        <ChevronLeft className="w-6 h-6 text-gray-900 dark:text-white" />
      </button>
    </div>
    <div className="absolute top-1/2 -translate-y-1/2 -right-4 z-10">
      <button className="swiper-button-next-custom p-2 rounded-full bg-white/10 backdrop-blur hover:bg-white/20 transition">
        <ChevronRight className="w-6 h-6 text-gray-900 dark:text-white" />
      </button>
    </div>
  </div>
</section>


  );
}
