import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String }, 
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
