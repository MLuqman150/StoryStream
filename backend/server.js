const express = require("express");
const app = express();
const port = 5000 || process.env.PORT


app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})