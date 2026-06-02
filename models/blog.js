import mongoose from "mongoose";

const blogschema = new mongoose.Schema({
  title: {
    type: String,
  },

  description: {
    type: String,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const blogmodel = mongoose.model("Blog", blogschema);

export default blogmodel;
