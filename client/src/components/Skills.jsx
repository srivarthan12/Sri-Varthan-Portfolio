import React, { useEffect, useState } from "react";
import axios from "axios";
// The 'api' import is unused in the original code, so I've kept the existing 'axios' usage.
// import api from "../api/axios"; 
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Skeleton Component for the Skill Card
const SkillSkeleton = () => (
  <div className="relative bg-gray-300 dark:bg-gray-800 backdrop-blur rounded-2xl shadow-lg overflow-hidden h-[32rem] animate-pulse">
    <div className="absolute left-0 bottom-0 w-full h-1/3 bg-black/20 p-6 z-10 flex flex-col justify-end space-y-4">
      {/* Placeholder for Title */}
      <div className="h-6 bg-gray-400 dark:bg-gray-600 rounded-md w-1/2"></div>
      {/* Placeholder for Progress Bar */}
      <div className="w-full h-3 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
      {/* Placeholder for Percentage */}
      <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded-md w-1/5 self-end"></div>
    </div>
  </div>
);


export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true); // <-- 1. Added loading state

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get("https://sri-varthan-portfolio.onrender.com/api/skills");
        setSkills(res.data);
      } catch (err) {
        console.error("Error fetching skills:", err);
      } finally {
        setLoading(false); // <-- 2. Set loading to false after fetch completes
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
          {/* --- 3. Conditional Rendering Logic --- */}
          {loading ? (
            // Show skeletons while loading. We render 3 to match the desktop view.
            Array.from({ length: 3 }).map((_, index) => (
              <SwiperSlide key={index}>
                <SkillSkeleton />
              </SwiperSlide>
            ))
          ) : (
            // Show actual skills once loaded
            skills.map((skill) => (
              <SwiperSlide key={skill._id}>
                <div className="relative group bg-white/10 dark:bg-white/5 backdrop-blur rounded-2xl shadow-lg overflow-hidden h-[32rem]">
                  <img
                    src={skill.image}
                    alt={skill.name}
                    className="w-full h-full object-cover absolute top-0 left-0 z-0"
                  />
                  <div className="absolute left-0 bottom-0 w-full h-1/3 group-hover:h-full bg-black/50 backdrop-blur-lg text-white p-6 z-10 transition-all duration-500 ease-in-out rounded-2xl flex flex-col justify-end group-hover:justify-center">
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
            ))
          )}
        </Swiper>

        {/* Swiper arrows (hide them during loading) */}
        {!loading && skills.length > 3 && ( // Only show if not loading and there are more slides than the view
            <>
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
            </>
        )}
      </div>
    </section>
  );
}
