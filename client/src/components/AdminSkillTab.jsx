import { useEffect, useState } from "react";
import axios from "axios";
import api from "../api/axios";

export default function SkillsAdmin() {
  const [skills, setSkills] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    percent: "",
    image: null,
  });

  const fetchSkills = async () => {
    try {
      const res = await api.get("/skills");
      setSkills(res.data);
    } catch (err) {
      console.error("Error fetching skills:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/skills/${id}`);
      setSkills(skills.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Error deleting skill:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("percent", formData.percent);
      data.append("image", formData.image);

      const res = await api.post("/skills", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSkills([...skills, res.data]);
      setFormData({ name: "", percent: "", image: null });
    } catch (err) {
      console.error("Error adding skill:", err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Manage Skills</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Skill Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="input"
          required
        />
        <input
          type="number"
          placeholder="Percentage"
          value={formData.percent}
          onChange={(e) => setFormData({ ...formData, percent: e.target.value })}
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
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition md:col-span-3"
        >
          Add Skill
        </button>
      </form>

      <div className="grid gap-4">
        {skills.map((skill) => (
          <div
            key={skill._id}
            className="p-4 border border-gray-300 dark:border-gray-700 rounded-md flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <img src={skill.image} alt={skill.name} className="w-10 h-10 object-contain" />
              <div>
                <h3 className="font-semibold">{skill.name}</h3>
                <p className="text-sm text-gray-500">{skill.percent}%</p>
              </div>
            </div>
            <button
              onClick={() => handleDelete(skill._id)}
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
