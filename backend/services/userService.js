const Users = require("../models/user.model")
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
require('dotenv').config()

// Function for user login 
async function login(body) {
    const { email, password } = body
    const user = await Users.findOne({ email })
    if (user == null) {
        return { message: "No user with this email found", user: null }
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const passwordMatch = await bcrypt.compare(user.password, passwordHash);
    if (!passwordMatch) {
        return { message: "Invalid Password", user: null }
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    return { message: "Login successful", user, token }
}

// function for user registration
async function createUser(body) {
    const { name, email, password } = body
    const hashedPassword = await bcrypt.hash(password, 10)

    const userExists = Users.find({ email })

    if (userExists) {
        throw new Error("User with this email already exists.")
    }

    const user = new Users({
        name,
        email,
        password: hashedPassword,
        role: "user"
    })

    await user.save()

    return { message: "User registered successfully", user: user }
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