const Blog = require('../models/blog.model')
const Users = require('../models/user.model')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

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

async function getAllBlogs() {
    const blogs = await Blog.find().sort({_id: -1})

    // Pagination to be implemented
    if (!blogs) {
        throw new Error("Currently there is no blog in the database")
    }
    return { message: "All the Blogs", blogs }
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

async function getBlogsByFollowing(body) {
    const userId = body.userId
    const followings = await Users.findOne({ _id: userId })

    if (!following) {
        throw new Error("No user with this id found")
    }
    const followingAuthors = followings["following"]
}
async function deleteBlog(id) { }

async function getBlogBySlug(slug) {
    const blog = await Blog.findOne({slug}).populate("author", "username followers following")

    if(!blog){
        throw new Error("No blog with this title found")
    }
    return {message: "Blog found", blog}
}

module.exports = { createBlog, getAllBlogs, getBlogsByAuthor, getBlogsByFollowing, deleteBlog, getBlogBySlug }