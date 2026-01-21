const Blog = require('../models/blog.model')
const Users = require('../models/user.model')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const jwt_decode = require('jwt-decode');

// function jwtDecode(token){
//     // var token = 'eyJ0eXAiO.../// jwt token';
//     var decoded = jwt_decode(token);
//     console.log(decoded);
// }

async function createBlog(body, file) {
    const { title, content, author, tags } = body
    const image = file ? `/uploads/${file.filename}` : null 

    const user = await Users.findOne({ _id: author })
    if (!user) {
        throw new Error("No user with this name found")
    }

    const existingBlog = await Blog.findOne({ title: title })
    if (existingBlog) {
        throw new Error("Blog with this title already exists.")
    }

    const slug = title.toLowerCase().replace(/\s+/g, "-")

    const newBlog = new Blog({
        title,
        image,
        content,
        author,
        slug,
        tags
    })

    await newBlog.save()

    // Adding the reference of the blog to the user
    user.createdBlogs.push(newBlog._id)
    await user.save()

    return { message: "Blog created successFully", blog: newBlog }
}

async function getAllBlogs(query) {
    let { page, pageSize } = query
    
    const blogs = await Blog.find().skip((page - 1) * pageSize).limit(pageSize).sort({_id: -1})

    const count = await Blog.countDocuments();
    // Pagination to be implemented
    if (!blogs) {
        throw new Error("Currently there is no blog in the database")
    }
    return { message: "All the Blogs", blogs, count }
}

async function getBlogsByAuthor(authorParam, query) {
    const author = authorParam
    let { page, pageSize } = query

    const authorId = new ObjectId(author)
    page = Number(page)
    pageSize = Number(pageSize)
    // const blogs = await Blog.find({ author: author })

    const blogs = await Blog.aggregate([
        {
            $match: {
                author: authorId
            }
        },
        {
            $facet: {
                metadata: [{ $count: 'totalCount' }],
                data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
            }
        }
    ])

    // pagination to be implemented
    if (!blogs) {
        return {message: "Currently this author have not posted any blog."}
        // throw new Error("Currently there is no blog by this author")
    }

    return { message: "All the Blogs by this author", blogs }
}

async function getBlogsByFollowing(body, query) {
    const userId = body
    let { page, pageSize } = query
    const following = await Users.findOne({ _id: userId })

    if (!following) {
        throw new Error("No user with this id found")
    }
    const followingAuthors = following["following"]
    // console.log("Following Authors: ", followingAuthors)

    if(followingAuthors.length == 0){
        return {message: "Currently you are not following anyone."}
    }
    const blogs = await Blog.find({ author: { $in: followingAuthors } }).skip((page - 1) * pageSize).limit(pageSize).sort({_id: -1})

    const count = await Blog.countDocuments();

    // if(!blogs){
    //     throw new Error("Currently you are following no one.")
    // }
    return { message: "All the Blogs by this author", blogs, count }
}
async function deleteBlog(id) { }

async function getBlogBySlug(slug) {
    const blog = await Blog.findOne({slug}).populate("author", "username followers following").populate("comments.user", "username")

    if(!blog){
        throw new Error("No blog with this title found")
    }
    return {message: "Blog found", blog}
}

// Implemet the remaining fix to the code
async function likeBlog(body){
    const {userId, blogId} = body

    const user = await Users.findOne({_id: userId})
    const blog = await Blog.findOne({_id: blogId})

    if(!user){
        throw new Error("No user found with this id")
    }
    if(!blog){
        throw new Error("No blog found with this id")
    }

    if(user.likedBlogs.includes(blog._id)){
        const updatedUser = await Users.updateOne({ _id: userId }, { $pull: { likedBlogs: blog._id } })
        const updatedBlog = await Blog.updateOne({ _id: blogId }, { $pull: { likes: user._id } })
        return {
            message: "Your like is removed",
            success: true
        }
    }

    if(user.disLikedBlogs.includes(blog._id)){
        const updatedUser = await Users.updateOne({ _id: userId }, { $pull: { disLikedBlogs: blog._id } })
        const updatedBlog = await Blog.updateOne({ _id: blogId }, { $pull: { dislikes: user._id } })
    }

    const updatedUser = await Users.updateOne({ _id: userId }, { $addToSet: { likedBlogs: blog._id } })
    const updatedBlog = await Blog.updateOne({ _id: blogId }, { $addToSet: { likes: user._id } })

    // user.likedBlogs.push(blog._id)
    // blog.likes.push(user._id)

    // await user.save()
    // await blog.save()

    return {
        message: "You liked the blog",
        success: true
    }
}

async function disLikeBlog(body){
    const {userId, blogId} = body

    const user = await Users.findOne({_id: userId})
    const blog = await Blog.findOne({_id: blogId})

    if(!user){
        throw new Error("No user found with this id")
    }

    if(!blog){
        throw new Error("No blog found with this id")
    }

    if(user.disLikedBlogs.includes(blog._id)){
        const updatedUser = await Users.updateOne({ _id: userId }, { $pull: { disLikedBlogs: blog._id } })
        const updatedBlog = await Blog.updateOne({ _id: blogId }, { $pull: { dislikes: user._id } })
        return {
            message: "Your dislike has been removed",
            success: true
        }
    }

    if(user.likedBlogs.includes(blog._id)){
        const updatedUser = await Users.updateOne({ _id: userId }, { $pull: { likedBlogs: blog._id } })
        const updatedBlog = await Blog.updateOne({ _id: blogId }, { $pull: { likes: user._id } })
    }

    // user.disLikedBlogs.push(blog._id)
    // blog.dislikes.push(user._id)
    // await user.save()
    // await blog.save()
    const updatedUser = await Users.updateOne({ _id: userId }, { $addToSet: { disLikedBlogs: blog._id } })
    const updatedBlog = await Blog.updateOne({ _id: blogId }, { $addToSet: { dislikes: user._id } })

    return {
        message: "You disliked the blog",
        success: true
    }
}

async function addComment(body){
    const {user, comment, blogId} = body
    
    const blog = await Blog.findOne({_id: blogId})
    const userExists = await Users.findOne({_id: user})
    
    if(!blog){
        throw new Error("No blog found with this id")
    }
    
    if(!userExists){
        throw new Error("No User found with this id")
    }
    
    const commentObject = {
        user,
        comment
    }

    const updatedBlog = await Blog.updateOne({ _id: blogId },{ $push: { comments: commentObject }})

    return {
        message: "Comment added successfully",
        success: true
    }
}

module.exports = { createBlog, getAllBlogs, getBlogsByAuthor, getBlogsByFollowing, deleteBlog, getBlogBySlug,likeBlog, disLikeBlog, addComment }