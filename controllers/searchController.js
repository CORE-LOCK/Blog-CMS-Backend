import blogmodel from "../models/blog.js";


export const searchBlogs = async (req, res)=>{
try{
    const {query} = req.query;

 const searchResults = await blogmodel.find({
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