import express from "express";
import Blog from "../models/blog.js";
import { getUpload } from "../middlewares/multer.js";

const router = express.Router();

// Upload middleware for blog images (Cloudinary folder: "portfolio_blog")
const upload = getUpload("portfolio_blog");

// ✅ Create blog post with image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file?.path || "";

    const blog = new Blog({ title, content, image });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get single blog
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete blog
router.delete("/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
