const Users = require("../models/user.model")

const adminCheck = async (req, res, next) => {
    const user = await Users.findOne(req.user)
    if (user.role !== "admin") {
        return res.status(401).send({ message: "Unauthorized" });
    }
    next()
}

module.exports = adminCheck