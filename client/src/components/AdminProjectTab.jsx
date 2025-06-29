import { useEffect, useState } from "react";
import axios from "axios";
import api from "../api/axios";

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    status: "",
    githubLink: "",
    link: "",
  });

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/projects/${id}`);
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("status", formData.status);
    data.append("githubLink", formData.githubLink);
    data.append("link", formData.link);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const res = await api.post("/projects", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setProjects([...projects, res.data]);
      setFormData({
        name: "",
        description: "",
        image: null,
        status: "",
        githubLink: "",
        link: "",
      });
    } catch (err) {
      console.error("Error adding project:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Manage Projects</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Project Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="input"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
          className="input"
          required
        />
        <input
          type="text"
          placeholder="Status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="input"
        />
        <input
          type="text"
          placeholder="GitHub Link"
          value={formData.githubLink}
          onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
          className="input"
        />
        <input
          type="text"
          placeholder="Live Link"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          className="input"
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="input md:col-span-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Project
        </button>
      </form>

      <div className="grid gap-4">
        {projects.map((project) => (
          <div
            key={project._id}
            className="p-4 border border-gray-300 dark:border-gray-700 rounded-md flex justify-between items-start"
          >
            <div>
              <h3 className="font-semibold text-lg">{project.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{project.description}</p>
              <p className="text-xs text-gray-400 mt-1">Status: {project.status}</p>
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-blue-500 text-sm block">
                  GitHub
                </a>
              )}
              {project.link && (
                <a href={project.link} target="_blank" rel="noreferrer" className="text-blue-500 text-sm block">
                  Live Site
                </a>
              )}
            </div>
            <button
              onClick={() => handleDelete(project._id)}
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
