// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import skillRoutes from "./routes/skillRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import blogRoutes from "./routes/blogRoute.js";
import authRoutes from "./routes/authRoutes.js"



// Load environment variables
dotenv.config();

const app = express();

// Middleware


app.use(cors({
  origin: ["http://localhost:5173", "https://sri-varthan-portfolio-1.onrender.com"],
  credentials: true,
}));

app.use(express.json());

// Base route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/skills", skillRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/admin", authRoutes);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
  connectDB()
});
