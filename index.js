import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import blogRoutes from "./routes/blogRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import generateBlogRoutes from "./routes/generateBlog.js";
import searchBlogs from "./routes/search.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const dbconnect = async () => {
   try{
    await mongoose.connect(process.env.monodb_url);
   console.log("database connected");
   }catch(error){
       console.log("database connection failed", error);
   }
};

app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", generateBlogRoutes);
app.use("/api/search", searchBlogs);

app.listen(process.env.port, ()=>{
    console.log(`server is running on port ${process.env.port}`);
});

dbconnect();