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

// Works for /user, /user/xyz, /user/1
app.get("/user", (req, res) => {
    console.log(req.query); // Reads query parameter from request as {}
    res.send({ firstName: "Nitin", lastName: "Premanand"})
});

app.get("/user/:userId", (req, res) => {
    console.log(req.params); // Reads path parameter from request as {}
    res.send({ firstName: "Nitin", lastName: "Premanand"})
});

app.get("/user/:userId/:password/:name", (req, res) => {
    console.log(req.params); // Reads path parameter from request as {}, : means dyanmic
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