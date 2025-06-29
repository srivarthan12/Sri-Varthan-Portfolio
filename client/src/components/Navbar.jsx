import { useState } from "react";
import { Sun, Moon, ChevronDown } from "lucide-react";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { Link, useLocation } from "react-router-dom";
import "@fontsource/orbitron";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    document.documentElement.classList.add("dark");
    return true;
  });

  const location = useLocation();
  const isHome = location.pathname === "/";

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Reusable scroll or link
  const NavItem = ({ to, label }) => {
    return isHome ? (
      <ScrollLink
        to={to}
        smooth={true}
        duration={500}
        offset={-80}
        className="cursor-pointer hover:text-rose-600 dark:hover:text-rose-400 transition"
      >
        {label}
      </ScrollLink>
    ) : (
      <Link
        to={`/?section=${to}`}
        className="hover:text-rose-600 dark:hover:text-rose-400 transition"
      >
        {label}
      </Link>
    );
  };

  return (
    <nav
      className="fixed top-0 z-50 w-full px-6 py-8
      bg-gradient-to-r from-white/70 via-gray-100/60 to-slate-200/50 dark:from-gray-900/70 dark:via-gray-800/60 dark:to-black/50
      backdrop-blur-[14px]
      border-b border-white/30 dark:border-gray-700
      shadow-[0_8px_30px_rgba(0,0,0,0.08)]
      transition-all duration-500"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo / Name */}
        <h1
          className="text-2xl font-bold tracking-widest text-gray-900 dark:text-white font-[Orbitron] cursor-pointer"
          onClick={() =>
            isHome
              ? scroll.scrollToTop({ duration: 500 })
              : window.location.assign("/")
          }
        >
          Sri Varthan R
        </h1>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          <ul className="hidden md:flex items-center gap-10 text-base font-medium text-gray-700 dark:text-gray-200 list-none">
            <li><NavItem to="hero" label="Home" /></li>
            <li><NavItem to="about" label="About" /></li>

            <li className="relative cursor-pointer" onClick={() => setMoreOpen(!moreOpen)}>
              <div className="flex items-center gap-1 hover:text-rose-600 dark:hover:text-rose-400 transition">
                More <ChevronDown size={16} className={`transition-transform ${moreOpen ? "rotate-180" : ""}`} />
              </div>
              {moreOpen && (
                <ul className="absolute top-8 left-0 bg-white/50 dark:bg-gray-900/70 backdrop-blur-lg border border-gray-200 dark:border-gray-700 shadow-xl rounded-xl px-4 py-3 w-52 text-sm text-gray-800 dark:text-gray-200 list-none space-y-1 z-50">
                  <li className="rounded px-2 py-1">
                    <NavItem to="skills" label="Skills" />
                  </li>
                  <li className="rounded px-2 py-1">
                    <NavItem to="projects" label="Projects" />
                  </li>
                  <li className="rounded px-2 py-1">
                    <NavItem to="work" label="Experience & Education" />
                  </li>
                  <li className="rounded px-2 py-1">
                    <Link to="/blog" className="hover:text-rose-600 dark:hover:text-rose-400 transition" onClick={() => setMoreOpen(false)}>
                      Blog
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>

          {/* Theme Toggle + Mobile Menu */}
          <button
            onClick={toggleDarkMode}
            className="text-gray-800 dark:text-white hover:text-rose-600 dark:hover:text-rose-400 transition"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-800 dark:text-white text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden mt-2 bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl border dark:border-gray-700 shadow-lg rounded-xl px-6 py-4 w-48 ml-auto">
          <ul className="flex flex-col gap-3 text-gray-800 dark:text-gray-200 text-sm list-none">
            <li><NavItem to="hero" label="Home" /></li>
            <li><NavItem to="about" label="About" /></li>
            <li><NavItem to="skills" label="Skills" /></li>
            <li><NavItem to="projects" label="Projects" /></li>
            <li><NavItem to="work" label="Experience & Education" /></li>
            <li>
              <Link to="/blog" onClick={() => setOpen(false)}>
                Blog
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
