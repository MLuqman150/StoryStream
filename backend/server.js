const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config()
const app = express();
const port = 5000 || process.env.PORT

// Database connection
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.use("/auth", require("./controllers/userAuth"))

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})