import yourImage from '../assets/Screenshot_20250704_123834.jpg' // Replace with actual image
import { TypeAnimation } from 'react-type-animation';

export default function Hero() {
  return (
<section id='hero' className="min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-16 pt-32 md:pt-20 bg-gradient-to-br from-white via-gray-100 to-slate-200 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-500">
      {/* Left Content */}
      <div className="flex-1 text-center md:text-left space-y-6 md:space-y-8">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white font-orbitron">
          Hi , I'm Sri Varthan R
        </h1>

       <TypeAnimation
  sequence={[
    'const role = "MERN Stack Developer";',
    2000,
    'const role = "Computer Enthusiast";',
    2000,
    'const role = "Tech Explorer";',
    2000,
  ]}
  wrapper="span"
  speed={55}
  className="block text-sm md:text-xl text-indigo-600 dark:text-green-400 font-mono"
  repeat={Infinity}
/>


        <p className="text-gray-700 dark:text-gray-300 text-md md:text-lg max-w-xl">
          I’m an aspiring full-stack web developer.I want to explore the world around me and get new experience
        </p>

        <a href="/resume.pdf"
  download
  target="_blank"
  rel="noopener noreferrer"
  >
  <button className="mt-4 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 transition">
    Download My Resume
  </button>
</a>

      </div>

      {/* Right Image */}
      <div className="flex-1 flex justify-center mt-10 md:mt-0">
        <img
          src={yourImage}
          alt="Profile"
          className="w-[280px] md:w-[400px] mb-20 ml-20 rounded-xl "
        />
      </div>
    </section>
  );
}
