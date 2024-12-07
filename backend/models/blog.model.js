const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
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
        required: false
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

const blogModel = mongoose.model("blogs", blogSchema)

module.exports = blogModel