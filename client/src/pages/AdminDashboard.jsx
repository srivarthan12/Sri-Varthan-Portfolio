import { useState } from "react";
import SkillsAdmin from "../components/AdminSkillTab";
import ProjectsAdmin from "../components/AdminProjectTab";
import BlogsAdmin from "../components/AdminBlogTab";

const tabs = ["Skills", "Projects", "Blogs"];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Skills");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white px-6 py-32">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

      {/* Tab Buttons */}
      <div className="flex justify-center gap-4 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              activeTab === tab
                ? "bg-rose-600 text-white"
                : "bg-gray-200 dark:bg-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto">
        {activeTab === "Skills" && <SkillsAdmin />}
        {activeTab === "Projects" && <ProjectsAdmin />}
        {activeTab === "Blogs" && <BlogsAdmin />}
      </div>
    </div>
  );
}
