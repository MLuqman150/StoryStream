const express = require('express');
const router = express.Router();
const blogService = require('../services/blogService')
const protect = require('../middlewares/authMiddleware')
const upload = require("../middlewares/imageMiddleware")

router.post("/createBlog", protect, upload.single("image"), async (req, res) => {
    const body = req.body
    const file = req.file
    console.log("Image ", req.body.image + " Body: ", req.body)
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
        const response = await blogService.getAllBlogs();
        res.status(200).json({message: response.message, blogs: response.blogs})
    }
    catch (err) {
        res.status(500).send("Unable to fetch blogs! Please try again.");
        console.log("Error: ", err);
    }
})

router.get("/getByTitle/:title",async (req,res)=>{
    const title = req.params.title
    try{
        const response = await blogService.getBlogByTitle(title)
        res.status(200).json({message: response.message, blog: response.blog})
    }
    catch(err){
        res.status(500).json({message: "Unable to fetch blog " + err.message})
    }
})

module.exports = router