const express = require('express');
const router = express.Router();
const blogService = require('../services/blogService')
const protect = require('../middlewares/authMiddleware')

router.post("/createBlog", protect, async (req, res) => {
    const body = req.body
    try {
        const response = await blogService.createBlog(body)
        res.status(200).send(response)
    }
    catch (err) {
        res.status(500).send("Unable to create blog! Please try again.");
        console.log("Error: ", err);
    }
})

router.get("/getAllBlogs", protect, async (req, res) => {
    try {
        const response = await blogService.getAllBlogs();
        res.status(200).send(response)
    }
    catch (err) {
        res.status(500).send("Unable to fetch blogs! Please try again.");
        console.log("Error: ", err);
    }
})

module.exports = router