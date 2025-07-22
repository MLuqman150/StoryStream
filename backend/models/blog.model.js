const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image:{
        type:String,
        required:false
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    tags: [{
        type: String
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }],
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
        comment: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
    }]
})

const blogs = mongoose.model("blogs", blogSchema)

module.exports = blogs