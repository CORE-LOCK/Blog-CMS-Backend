import BlogModel from "../models/BlogModel.js";


export const searchBlogs = async (req, res)=>{
try{
    const {query} = req.query;

 const searchResults = await BlogModel.find({
    title: {
        $regex: query,
        $options:'i',
    }
 });
 res.status(200).json({
    success:true,
    searchResults,
 });
}catch(error){
    res.status(500).json({
        success:false,
        message:error.message,
    })

}
}