import { Github, Linkedin, Instagram, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="w-full px-6 py-12
      bg-gradient-to-r from-white/70 via-gray-100/60 to-slate-200/50 dark:from-gray-900/70 dark:via-gray-800/60 dark:to-black/50
      backdrop-blur-[14px]
      border-t border-white/30 dark:border-gray-700
      shadow-[0_-8px_30px_rgba(0,0,0,0.08)]
      transition-all duration-500"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-gray-800 dark:text-gray-200">
        
        {/* Column 1 - Logo */}
        <div>
          <h2 className="text-2xl font-bold font-[Orbitron] mb-2">Sri Varthan R</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Passionate Full-Stack Developer crafting modern & accessible web experiences.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/#hero" className="hover:text-rose-600 dark:hover:text-rose-400 transition">Home</Link>
            </li>
            <li>
              <Link to="/#about" className="hover:text-rose-600 dark:hover:text-rose-400 transition">About</Link>
            </li>
            <li>
              <Link to="/#skills" className="hover:text-rose-600 dark:hover:text-rose-400 transition">Skills</Link>
            </li>
            <li>
              <Link to="/#projects" className="hover:text-rose-600 dark:hover:text-rose-400 transition">Projects</Link>
            </li>
            <li>
              <Link to="/#work" className="hover:text-rose-600 dark:hover:text-rose-400 transition">Experience & Education</Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-rose-600 dark:hover:text-rose-400 transition">Blog</Link>
            </li>
            <li>
              <Link to="/admin" className="hover:text-rose-600 dark:hover:text-rose-400 transition">admin</Link>
            </li>
          </ul>
        </div>

        {/* Column 3 - Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Connect with Me</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://github.com/srivarthan12"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-rose-600 dark:hover:text-rose-400 transition"
              >
                <Github size={18} /> GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/sri-varthan-54927b1b2/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-rose-600 dark:hover:text-rose-400 transition"
              >
                <Linkedin size={18} /> LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/sri_varthan_17"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-rose-600 dark:hover:text-rose-400 transition"
              >
                <Instagram size={18} /> Instagram
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4 - Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <a
            href="tel:+919751300298"
            className="flex items-center gap-2 text-sm mb-2 hover:text-rose-600 dark:hover:text-rose-400 transition"
          >
            <Phone size={16} /> +91 97513 00298
          </a>
          <p className="flex items-center gap-2 text-sm hover:text-rose-600 dark:hover:text-rose-400 transition">
            <Mail size={16} /> sri2112045@gmail.com
          </p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 border-t border-gray-300 dark:border-gray-600 pt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Sri Varthan R. All rights reserved.
      </div>
    </footer>
  );
}
