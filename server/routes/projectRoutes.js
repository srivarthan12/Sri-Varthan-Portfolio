// server/routes/projectRoutes.js

import express from "express";
import {
  createProject,
  getProjects,
  deleteProject,
  updateProject,
} from "../controllers/projectController.js";
import { getUpload } from "../middlewares/multer.js";
console.log("getUpload('portfolio_projects') called");


const router = express.Router();
const upload = getUpload("portfolio_projects");

router.post("/", upload.single("image"), createProject);
router.get("/", getProjects);
router.delete("/:id", deleteProject);
router.put("/:id", upload.single("image"), updateProject); // Also updated PUT

export default router;
