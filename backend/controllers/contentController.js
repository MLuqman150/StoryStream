const express = require('express');
const router = express.Router();
const blogService = require('../services/blogService')
const protect = require('../middlewares/authMiddleware')
const upload = require("../middlewares/imageMiddleware")

router.post("/createBlog", protect, upload.single("image"), async (req, res) => {
    const body = req.body
    const file = req.file

    console.log("Image ", req.body.image + " Body: ", req.body)
    console.log("File: ", file)
    try {
        const response = await blogService.createBlog(body, file)
        res.status(200).json({message: response.message, blog: response.blog})
    }
    catch (err) {
        res.status(500).send("Unable to create blog! Please try again.");
        console.log("Error: ", err);
    }
})

router.get("/getAllBlogs", protect, async (req, res) => {
    try {
        const query = req.query
        const response = await blogService.getAllBlogs(query);
        res.status(200).json({message: response.message, blogs: response.blogs, count: response.count})
    }
    catch (err) {
        res.status(500).send("Unable to fetch blogs! Please try again.");
        console.log("Error: ", err);
    }
})

router.get("/getBlogsByFollowing",protect, async (req,res) =>{
    try{
        const body = req.user
        // console.log("Body: ", body)
        const query = req.query
        const response = await blogService.getBlogsByFollowing(body,query)
        res.status(200).json({message: response.message, blogs: response.blogs, count: response.count})
    }
    catch(err){
        res.status(500).send("Unable to fetch blogs! Please try again.");
        console.log("Error: ", err);
    }
})

router.get("/getBySlug/:slug",async (req,res)=>{
    const slug = req.params.slug
    // console.log("Slug: ", slug)
    try{
        const response = await blogService.getBlogBySlug(slug)
        res.status(200).json({message: response.message, blog: response.blog})
    }
    catch(err){
        res.status(500).json({message: "Unable to fetch blog " + err.message})
    }
})

router.get("/getBlogByAuthor/:authorId" , async (req,res)=>{
    try{
        const author = req.params.authorId
        const query = req.query
        // console.log("Params: ", author)
        const response = await blogService.getBlogsByAuthor(author,query)
        res.status(200).json({message: response.message, blogs: response.blogs})
    }
    catch(err){
        res.status(500).json({message: "Unable to fetch blog " + err.message})
    }
})

router.post("/likeBlog",protect, async (req,res)=>{
    try{
        const body = req.body
        const response = await blogService.likeBlog(body)
        res.status(200).json({message: response.message, success: response.success})
    }
    catch(err){
        res.status(500).json({message: "Unable to fetch blog " + err.message})
    }
})

router.post("/disLikeBlog", protect, async (req,res)=>{
    try{
        const body = req.body
        const response = await blogService.disLikeBlog(body)
        res.status(200).json({message: response.message, success: response.success})
    }
    catch(err){
        res.status(500).json({message: "Unable to fetch blog " + err.message})
    }
})

router.post("/addComment", async (req,res)=>{
    try{
        const body = req.body
        const response = await blogService.addComment(body)
        res.status(200).json({message: response.message, success: response.success})
    }
    catch(err){
        res.status(500).json({message: "Unable to add comment " + err.message})
    }
})

// router.get("/uploads/:image",(req,res)=>{
//     try{
//         const image = req.params.image
//         res.status(200).json({message: "Image fetched successfully", image: image})
//     }
//     catch(err){
//         res.status(500).send("Unable to fetch image! Please try again.");
//         console.log("Error: ", err);
//     }
// })


module.exports = router