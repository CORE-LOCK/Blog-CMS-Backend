import blogmodel from "../models/blog.js";
import cloudinary from "../config/cloudinary.js";


 export const createBlog = async (req, res) => {
  try {
    const {title, description, category} = req.body;

      if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }
    
    console.log(req.file);
    const result = await cloudinary.uploader.upload(req.file.path);

    const newBlog = await blogmodel.create({
      title, 
      description, 
      category,
      image: result.secure_url,
    });

    res.status(200).json({
      sucess: true,
      message: "blog created sucessfully",
      bolg: newBlog,
      
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "bolg create failed",
      erroer: error.message,
    });
  }
};

// get all bolgs

export const allBlogs = async (req, res) => {
  try {
    const findallBolgs = await blogmodel.find();
    res.status(200).json(findallBolgs);
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

// get single blog

export const singleBlog = async (req, res) => {
  try {
    const getsingleBlog = await blogmodel.findById(req.params.id);
    res.status(200).json(getsingleBlog);
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

// update blog

export const getupdateBlog = async (req, res) => {
  try {
    const updateBlog = await blogmodel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.status(200).json(updateBlog);
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

// delete blog

export const getdeleteBlog = async (req, res) => {
  try {
    const deleteBlog = await blogmodel.findByIdAndDelete(req.params.id);

    res.status(200).json(deleteBlog);
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};
