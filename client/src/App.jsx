// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Work from "./components/Work";
import Footer from "./components/Footer";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/Blogdetail";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { isAdminAuthenticated } from "./utils/adminAuth.js";
import { Navigate } from "react-router-dom";


// Component to scroll to section if URL has a hash (e.g. /#about)
function ScrollToHashElement() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        // Wait for rendering to complete
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 0);
      }
    }
  }, [location]);

  return null;
}

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Work />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToHashElement />
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            isAdminAuthenticated() ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/admin" />
            )
          }
        />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
