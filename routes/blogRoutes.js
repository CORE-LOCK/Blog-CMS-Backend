import express from "express";
import AuthMiddleware from "../middlewares/authmiddleware.js"
import upload from "../middlewares/multer.js"
import {
  createBlog,
  allBlogs,
  singleBlog,
  getupdateBlog,
  getdeleteBlog,
} from "../controllers/blogController.js";

const router = express.Router();

//   crud operations
router.post("/create",AuthMiddleware, upload.single("image"), createBlog);
router.get("/allBlogs", allBlogs);
router.get("/singleBlog/:id", singleBlog);
router.put("/getupdateBlog/:id", getupdateBlog);
router.delete("/getdeleteBlog/:id", getdeleteBlog);

export default router;
