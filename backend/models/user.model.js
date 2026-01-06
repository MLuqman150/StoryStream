const { default: mongoose } = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    createdBlogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "blogs"
    }],
    likedBlogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "blogs"
    }],
    disLikedBlogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "blogs"
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }]
}, {
    timestamps: true
})

const users = mongoose.model('users', userSchema)

module.exports = users