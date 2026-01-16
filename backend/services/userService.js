const Users = require("../models/user.model")
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

require('dotenv').config()



// Function for user login 
async function login(body) {
    const { email, password } = body
    if (!email || !password) {
        throw new Error("Please Enter your email and password!")
    }
    const user = await Users.findOne({ email: email })
    if (user == null) {
        return { message: "No user with this email found" }
        // throw ("No user with this email found")
    }
    // const passwordHash = await bcrypt.hash(password, 10);
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return { message: "Invalid Password" }
        // throw ("Invalid Password")
        // throw new Error("Invalid Password")
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    const userEmail= user.email

    const userId = user._id

    console.log("User Info: ", userEmail, userId)
    return { 
        message: "Login successful", 
        userEmail,
        userId,
        token,        
    }
}

// function for user registration
async function createUser(body) {
    const { name,username, email, password } = body
    const hashedPassword = await bcrypt.hash(password, 10)

    const userExists = await Users.findOne({ email })

    // console.log("User Exists: ", userExists)

    if (userExists) {
        return{message:"User with this email already exists."}
    }

    const user = new Users({
        name,
        username,
        email,
        password: hashedPassword,
        role: "user"
    })

    await user.save()

    return { message: "User registered successfully", name, email }
}

async function getAllUsers() {
    const users = await Users.find({ role: "user" })
    if (!users) {
        return "Currently there is no user in the database"
    }

    return {
        message: "All the users Present in the database",
        users
    }
}

async function getAuthorByName(name) {
    const user = await Users.find({username: name },{ password:0,  role:0 })
    if (!user) {
        throw new Error(`No user with this name ${name} found.`)
    }
    return {
        message: "User Found Successfully",
        user
    }
}

async function followUser(body){
    const {authorId, userId} = body

    const author = await Users.findOne({ _id: authorId })
    const user = await Users.findOne({ _id: userId })

    if(!user || !author){
        throw new Error("No user found with this name")
    }

    user.following.push(author._id)
    author.followers.push(user._id)

    await user.save()
    await author.save()

    return  {
        message: `You are now following ${author.username}`,
        success: true
    }

}

async function unFollowUser(body){
    const {authorId, userId} = body

    // console.log("authorId: ",authorId, "userId: ",userId)
    
    const author = await Users.findOne({ _id: authorId })
    const user = await Users.findOne({ _id: userId })

    // console.log("author: ",author, "user: ",user)

    if(!user || !author){
        throw new Error("No user found with this name")
    }

    const updatedUser = await Users.updateOne({ _id: userId }, { $pull: { following: author._id } })
    const updatedAuthor = await Users.updateOne({ _id: authorId }, { $pull: { followers: user._id } })

    // console.log("updatedUser: ",updatedUser, "updatedAuthor: ",updatedAuthor)
    // user.following.pop(author._id)
    // author.followers.pop(user._id)

    // await user.save()
    // await author.save()

    // await updatedUser.save()
    // await updatedAuthor.save()

    return  {
        message: `You have unfollowed ${author.username}`,
        success: true
    }

}

module.exports = {
    login,
    createUser,
    getAllUsers,
    getAuthorByName,
    followUser,
    unFollowUser
}