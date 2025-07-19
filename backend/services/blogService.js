const Blog = require('../models/blog.model')
const Users = require('../models/user.model')

async function createBlog(body, file) {
    const { title, content, author, tags } = body
    const image = file ? `/uploads/${file.filename}` : null 

    const existingBlog = await Blog.findOne({ title: title })
    if (existingBlog) {
        throw new Error("Blog with this title already exists.")
    }

    const newBlog = new Blog({
        title,
        image,
        content,
        author,
        tags
    })

    await newBlog.save()

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

async function getBlogsByAuthor(body, query) {
    const author = body.author
    const { page, pageSize } = query

    // const blogs = await Blog.find({ author: author })

    const blogs = await Blog.aggregate([
        {
            $match: {
                author: author
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
        throw new Error("Currently there is no blog by this author")
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

async function getBlogByTitle(title) {
    const blog = await Blog.findOne({title})

    if(!blog){
        throw new Error("No blog with this title found")
    }
    return {message: "Blog found", blog}
}

module.exports = { createBlog, getAllBlogs, getBlogsByAuthor, getBlogsByFollowing, deleteBlog, getBlogByTitle }