const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config()
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000 || process.env.PORT
const createAdmin = require('./createAdmin.js')


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

// Code to create the admin user if not created
const admin = async () => {
    const response = await createAdmin()
    console.log(response)
}

app.use(cors())
// app.use(express.json());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './uploads')))

app.use(bodyParser.json({limit: '10MB', parameterLimit:1500000}));
// app.use(bodyParser.urlencoded({limit: '10MB', extended: true, parameterLimit:1500000}));

admin()

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.use("/auth", require("./controllers/userAuth"))
app.use("/blog", require("./controllers/contentController"))

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})