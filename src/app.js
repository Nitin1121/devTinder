const express = require("express");

// New expressJS application
// Creating server using expressJS framework
const app = express(); // instance of expressJS application


// Request handler
// If we want to handle different request differently we need to modify this
app.use("/hello", (req, res) => {
    res.send("Hello from the hello route!");
});

app.use("/test", (req, res) => {
    res.send("Hello from the test route!");
});

app.use("/", (req, res) => {
    res.send("Hello from the server!");
});

// Listening on port 3000
app.listen("3000", () => {
    console.log("Server is listening in port 3000....");
});