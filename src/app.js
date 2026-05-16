const express = require("express");

// New expressJS application
// Creating server using expressJS framework
const app = express(); // instance of expressJS application

// Request handler
// If we want to handle different request differently we need to modify this
app.use("/test", (req, res) => {
    res.send("Hello from the server! Testing...");
});

// app.use("/user", [rh1, rh2, rh3, rh4]);
app.use("/user", (req, res, next) => {
    console.log("1st response...");
    // res.send("1st response...");
    next();
}, (req, res, next) => {
    console.log("2nd response...");
    // res.send("2nd response...");
    next();
}, (req, res, next) => {
    console.log("3rd response...");
    // res.send("3rd response...");
    next();
}, (req, res, next) => {
    console.log("4th response...");
    // res.send("4th response...");
    next();
}, (req, res, next) => {
    console.log("5th response...");
    res.send("5th response...");
});

// Listening on port 3000
app.listen("3000", () => {
    console.log("Server is listening in port 3000....");
});