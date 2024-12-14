const express = require("express");
const router = express.Router();
const userService = require("../services/userService")
const protect = require("../middlewares/authMiddleware")
const isAdmin = require("../middlewares/adminCheck")

// Api for user login
router.post("/login", async (req, res) => {
    console.log("Body: ", req.body)
    const body = req.body
    try {
        const response = await userService.login(body)
        res.status(200).send({ message: response.message, user: response.user, token: response.token });
    }
    catch (err) {
        res.status(500).send("Unable to login! Please try again.");
        console.log("Error: ", err);
    }
})

// Api for user sign up
router.post("/signup", async (req, res) => {
    try {
        const response = await userService.createUser(req.body)
        res.status(200).send({ message: response.message, user: response.user });
    }
    catch (err) {
        res.status(500).send("Unable to Register you! Please try again.");
        console.log("Error: ", err);
    }
})

router.get("/getUsers", isAdmin, protect, async (req, res) => {
    try {
        const allUsers = await userService.getAllUsers();
        res.status(200).send({ message: allUsers.message, Users: allUsers.user })
    }
    catch (err) {
        res.status(500).send("Unable to get users! Please try again.");
        console.log("Error: ", err);
    }
})

router.get("/getByName/:name", isAdmin, protect, async (req, res) => {
    const name = req.params.name
    try {
        const userByName = await userService.getUserByName(name)
        res.status(200).send({ message: userByName.message, user: userByName.user })
    }
    catch (err) {
        res.status(500).send(`Unable to get user ${name}! Please try again.`);
    }
})

module.exports = router