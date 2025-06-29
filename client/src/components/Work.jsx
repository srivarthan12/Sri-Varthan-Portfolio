import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const timelineData = {
  work: [
    { title: "microsoft excel data entry", company: "Automaark battery shop", from: "2023", to: "2023" },
    { title: "Hardware&network trainee", company: "Hi-fi tech solution", from: "2024", to: "2024" },
  ],
  education: [
    { title: "Alagar Public School", company: "Tuticorin", from: "2011", to: "2023" },
    { title: "Bishop Heber College", company: "Trichy", from: "2023", to: "2026" },
  ],
};

const TimelineColumn = ({ title, color, data }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div ref={ref} className="relative flex-1 px-4">
      <h2
        className={`text-2xl font-bold mb-8 text-center ${
          color === "blue" ? "text-blue-500" : "text-green-500"
        }`}
      >
        {title}
      </h2>

      {/* Vertical Line – perfectly centered */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: inView ? "100%" : 0 }}
        transition={{ duration: 1 }}
        className="absolute top-16 left-1/2 transform -translate-x-1/2 w-1 bg-gray-600 z-0"
      />

      <div className="space-y-20 pt-12">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Dot – now exactly on the center line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-4 h-4 rounded-full z-10 bg-blue-500 border-2 border-white shadow-md" />

            {/* Content Box */}
            <div className="ml-0 sm:ml-10 sm:pl-4 bg-gray-800 rounded-xl shadow-lg w-fit max-w-xs sm:max-w-sm text-left mx-auto sm:mx-0">
              <div className="p-4">
                <h4 className="text-white font-semibold">{item.title}</h4>
                <p className="text-gray-300">{item.company}</p>
                <p className="text-gray-400 text-sm">
                  {item.from} - {item.to}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};


const ExperienceEducation = () => {
  return (
    <section id="work" className="py-20 px-4 sm:px-8 md:px-20 bg-gradient-to-br from-white via-gray-100 to-slate-200 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        <TimelineColumn title="Work" color="blue" data={timelineData.work} />
        <TimelineColumn title="Education" color="green" data={timelineData.education} />
      </div>
    </section>
  );
};

export default ExperienceEducation;
