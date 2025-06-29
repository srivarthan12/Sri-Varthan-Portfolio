import Project from "../models/project.js";

// GET all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
};

// POST create a new project
export const createProject = async (req, res) => {
  try {
    const { name, description, status, githubLink, link } = req.body;
    const image = req.file?.path
    console.log("HEADERS:", req.headers["content-type"]);
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);


    if (!name || !description || !status || !image) {
      return res.status(400).json({
        message: "Name, description, status, and image are required.",
      });
    }

    const project = new Project({
      name,
      description,
      status,
      githubLink,
      link,
      image,
    });

    await project.save();

    res
      .status(201)
      .json({ message: "Project created successfully", project });
  } catch (err) {
    res.status(400).json({ message: "Failed to create project", error: err });
  }
};

// PUT update a project (optional)
export const updateProject = async (req, res) => {
  try {
    const { name, description, status, githubLink, link } = req.body;
    const image = req.file?.path;

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        status,
        githubLink,
        link,
        ...(image && { image }),
      },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: "Failed to update project", error: err });
  }
};

// DELETE a project (optional)
export const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete project", error: err });
  }
};
