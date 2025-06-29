// src/pages/Blog.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("https://sri-varthan-portfolio.onrender.com/api/blogs");
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  return (
<section className="min-h-screen px-6 md:px-20 pt-32 pb-12 bg-gradient-to-tr from-white via-gray-100 to-slate-200 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-500 font-['Orbitron',sans-serif]">
      <h2 className="text-4xl font-bold mb-12 text-center dark:text-white text-gray-900">
        Read my stories here
      </h2>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post._id}
            className="rounded-2xl overflow-hidden bg-white/10 dark:bg-white/5 backdrop-blur shadow-xl hover:shadow-2xl transition-shadow duration-500"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {post.title}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 line-clamp-3">
                {post.description}
              </p>
              <Link
                to={`/blog/${post._id}`}
                className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
