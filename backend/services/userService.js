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
    const { name, email, password } = body
    const hashedPassword = await bcrypt.hash(password, 10)

    const userExists = Users.find({ email })

    if (userExists) {
        return{message:"User with this email already exists."}
    }

    const user = new Users({
        name,
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

async function getUserByName(name) {
    const user = await Users.find({ name })
    if (!user) {
        throw new Error(`No user with this name ${name} found.`)
    }
    return {
        message: "User Found Successfully",
        user
    }
}

module.exports = {
    login,
    createUser,
    getAllUsers,
    getUserByName
}