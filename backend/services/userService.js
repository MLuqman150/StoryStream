const Users = require("../models/user.model")

async function login(body) {
    const { email, password } = body
}

module.exports = {
    login
}