const Users = require("./models/user.model")
require('dotenv').config()
const bcrypt = require("bcryptjs");

const createAdmin = async () => {
    const admin = await Users.findOne({ role: "admin" })
    if (admin == null) {
        const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
        const user = new Users({
            name: "Admin",
            email: process.env.ADMIN_EMAIL,
            password: passwordHash,
            role: "admin"
        })

        await user.save()
        return {
            message: "Admin created successfully",
            admin: user
        }
    }
    else {
        return {
            message: "Admin already exists",
            id: admin._id,
            email: admin.email
        }
    }
}

module.exports = createAdmin