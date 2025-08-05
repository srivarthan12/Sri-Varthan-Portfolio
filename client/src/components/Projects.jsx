import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Skeleton Component for the Project Card
const ProjectSkeleton = () => (
  <div className="relative rounded-2xl shadow-lg overflow-hidden h-[28rem] bg-gray-300 dark:bg-gray-800 animate-pulse">
    <div className="w-full h-full bg-gray-400 dark:bg-gray-700"></div>
    <div className="absolute left-0 bottom-0 w-full h-[20%] bg-black/20 backdrop-blur-sm p-6 z-10 flex items-center justify-center">
      <div className="h-6 bg-gray-500 dark:bg-gray-600 rounded-md w-3/4"></div>
    </div>
  </div>
);

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); // <-- 1. Added loading state

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("https://sri-varthan-portfolio-1.onrender.com//api/projects");
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false); // <-- 2. Set loading to false after fetch completes
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="px-6 md:px-16 pt-20 pb-6 bg-gradient-to-tr from-white via-gray-100 to-slate-200 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-500 font-['Orbitron',sans-serif]">
      <h2 className="text-3xl font-bold mb-6 text-center dark:text-white text-gray-900">
        My Projects
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
            1024: { slidesPerView: 2 },
          }}
          className="px-4"
        >
          {/* --- 3. Conditional Rendering Logic --- */}
          {loading ? (
            // Show skeletons while loading
            // We render 2 skeletons to match the desktop view (slidesPerView: 2)
            Array.from({ length: 2 }).map((_, index) => (
              <SwiperSlide key={index}>
                <ProjectSkeleton />
              </SwiperSlide>
            ))
          ) : (
            // Show actual projects once loaded
            projects.map((project) => (
              <SwiperSlide key={project._id}>
                <div className="relative group rounded-2xl shadow-lg overflow-hidden h-[28rem]">
                  {project.status === "building" && (
                    <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-md flex items-center justify-center text-white text-xl font-semibold">
                      Building...
                    </div>
                  )}

                  <div
                    className={`bg-white/10 dark:bg-white/5 w-full h-full relative ${
                      project.status === "building" ? "blur-sm pointer-events-none" : ""
                    }`}
                  >
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover absolute top-0 left-0 z-0 transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute left-0 bottom-0 w-full h-[20%] group-hover:h-full bg-black/50 backdrop-blur-lg text-white p-6 z-10 transition-all duration-500 ease-in-out rounded-2xl flex flex-col justify-start group-hover:justify-center space-y-3">
                      <h3 className="text-xl font-semibold text-center">{project.name}</h3>

                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-sm space-y-2">
                        <p className="text-center">{project.description}</p>
                        <div className="flex justify-center gap-4">
                          {project.githubLink && (
                            <a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline hover:text-blue-400"
                            >
                              GitHub
                            </a>
                          )}
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline hover:text-green-400"
                            >
                              Live Site
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>

        {/* Swiper Arrows (hide them during loading to prevent interaction) */}
        {!loading && projects.length > 2 && ( // Only show arrows if not loading and there are enough slides to navigate
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
