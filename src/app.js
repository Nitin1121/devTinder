const express = require("express");

// New expressJS application
// Creating server using expressJS framework
const app = express(); // instance of expressJS application

// Request handler
// If we want to handle different request differently we need to modify this
app.use("/test", (req, res) => {
    res.send("Hello from the server! Testing...");
});

// It will handle all the route API
// app.use("/user", (req, res) => {
//     res.send("Hello from the server! User...");
// });

// b is optional, Works for /abc, /ac
app.get("/ab?c", (req, res) => {
    res.send({ firstName: "Nitin", lastName: "Premanand"})
});

// bc is optional, Works for /abcd, /ad
// Not works for /acd
app.get("/a(bc)?d", (req, res) => {
    res.send({ firstName: "Nitin", lastName: "Premanand"})
});

// b can be more than once, Works for /abc, /abbbbbbbbbbbc
// Not works for /abcc
app.get("/ab+c", (req, res) => {
    res.send({ firstName: "Nitin", lastName: "Premanand"})
});

// bc can be more than once, Works for /abcd, /abcbcbcbd
// Not works for /acd
app.get("/a(bc)+d", (req, res) => {
    res.send({ firstName: "Nitin", lastName: "Premanand"})
});

// It should start with ab & end with cd anything inbetween accepted, Works for /abHAHAHAHcd
app.get("/ab*cd", (req, res) => {
    res.send({ firstName: "Nitin", lastName: "Premanand"})
});

app.get(/a/, (req, res) => {
    res.send({ firstName: "Nitin", lastName: "Premanand"})
});
app.get(/.^fly$/, (req, res) => {
    res.send({ firstName: "Nitin", lastName: "Premanand"})
});

// Works for /user, /user/xyz, /user/1
app.get("/user", (req, res) => {
    res.send({ firstName: "Nitin", lastName: "Premanand"})
});

app.post("/user", (req, res) => {
    res.send("Data successfully saved into database");
});

app.delete("/user", (req, res) => {
    res.send("Data successfully removed from database");
});

// Listening on port 3000
app.listen("3000", () => {
    console.log("Server is listening in port 3000....");
});