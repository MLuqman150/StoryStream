const Users = require("../models/user.model")
const bcrypt = require("bcryptjs");

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
}

async function createUser(body) {
    const { name, email, password } = body
    const hashedPassword = await bcrypt.hash(password, 10)
}

module.exports = {
    login,
    createUser
}