import express from "express";
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skillController.js";

import { getUpload } from "../middlewares/multer.js";

// Use "portfolio_skills" as the folder name for skills
const upload = getUpload("portfolio_skills");

const router = express.Router();

router.get("/", getSkills);

// Upload a new skill with image
router.post("/", upload.single("image"), createSkill);

// Update skill (with image if needed)
router.put("/:id", upload.single("image"), updateSkill);

router.delete("/:id",deleteSkill)

export default router;
