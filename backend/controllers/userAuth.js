const express = require("express");
const router = express.Router();
const userService = require("../services/userService")

// Api for user login
router.post("/login", async (req, res) => {
    try {
        const response = await userService.login(req.body)
        res.status(200).send({ message: response.message, user: response.user });
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

module.exports = router