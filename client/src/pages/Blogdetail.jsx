// src/pages/BlogDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

export default function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`https://sri-varthan-portfolio.onrender.com/api/blogs/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };
    fetchBlog();
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-700 dark:text-gray-300 text-xl font-semibold font-['Orbitron']">
        Loading...
      </div>
    );
  }

  return (
    <section className="min-h-screen px-6 md:px-24 py-16 bg-gradient-to-br from-white via-gray-100 to-slate-200 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-500 font-['Orbitron'] text-gray-900 dark:text-white">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          to="/blog"
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-6 text-sm"
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        {/* Blog Layout */}
        <div className="bg-white/20 dark:bg-white/10 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-3xl shadow-[0_10px_60px_rgba(0,0,0,0.1)] p-6 sm:p-12 transition-all duration-500">
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-10 text-gray-900 dark:text-white">
            {post.title}
          </h1>

          <div className="md:flex md:items-start gap-6">
            <img
              src={post.image}
              alt={post.title}
              className="w-full md:w-72 h-52 object-cover rounded-2xl mb-6 md:mb-0 border border-white/30 dark:border-white/10 shadow-md float-left md:float-none"
            />

            <div className="text-lg sm:text-xl leading-relaxed tracking-wide text-gray-800 dark:text-gray-200 whitespace-pre-line">
              {post.content}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
