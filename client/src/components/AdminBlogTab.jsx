import { useEffect, useState } from "react";
import api from "../api/axios";

export default function BlogsAdmin() {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
  });

  const fetchBlogs = async () => {
    try {
      const res = await api.get("/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/blogs/${id}`);
      setBlogs(blogs.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const res = await api.post("/blogs", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setBlogs([...blogs, res.data]);
      setFormData({
        title: "",
        content: "",
        image: null,
      });
    } catch (err) {
      console.error("Error adding blog:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Manage Blogs</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          className="input"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.files[0] })
          }
          className="input"
          required
        />

        <textarea
          placeholder="Blog Content"
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          className="input md:col-span-2 h-32"
          required
        />

        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition md:col-span-2"
        >
          Add Blog
        </button>
      </form>

      <div className="grid gap-4">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="p-4 border border-gray-300 dark:border-gray-700 rounded-md flex justify-between items-start"
          >
            <div>
              <h3 className="font-semibold text-lg">{blog.title}</h3>
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-32 h-20 object-cover rounded mt-2 mb-2"
                />
              )}
              <p className="text-xs text-gray-400 mt-1">
                {blog.content.slice(0, 100)}...
              </p>
            </div>
            <button
              onClick={() => handleDelete(blog._id)}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
