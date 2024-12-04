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

    const user = new Users({
        name,
        email,
        password: hashedPassword,
        role: "user"
    })

    await user.save()

    return { message: "User registered successfully", user: user }
}

module.exports = {
    login,
    createUser
}