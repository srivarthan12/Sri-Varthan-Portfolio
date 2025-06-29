import { Skill } from "../models/skill.js";

// GET all skills
export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
};

// POST create new skill
export const createSkill = async (req, res) => {
  try {
    const { name, percent } = req.body;
    const image = req.file?.path;

    const skill = new Skill({ name, percent, image });
    await skill.save();

    res.status(201).json(skill);
  } catch (err) {
    res.status(400).json({ message: "Failed to create skill", error: err });
  }
};


// PUT update a skill by ID
export const updateSkill = async (req, res) => {
  try {
    const { name, percent, image } = req.body;
    const updatedSkill = await Skill.findByIdAndUpdate(
      req.params.id,
      { name, percent, image },
      { new: true }
    );
    if (!updatedSkill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.status(200).json(updatedSkill);
  } catch (err) {
    res.status(400).json({ message: "Failed to update skill", error: err });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.status(200).json({ message: "Skill deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete skill", error: err });
  }
};