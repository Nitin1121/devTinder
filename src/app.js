const express = require("express");
const { userAuthorization, adminAuthorization } = require("./middlewares/auth");

// New expressJS application
// Creating server using expressJS framework
const app = express(); // instance of expressJS application

app.use("/user", userAuthorization);
app.use("/admin", adminAuthorization);

app.get("/user",  (req, res, next) => {
    res.send("User data sent");
});

app.get("/admin/getAllData", (req, res, next) => {
    res.send("Admin data sent");
});

app.get("/admin/deleteUser", (req, res, next) => {
    res.send("Deleted the user");
});

app.get("/getUserData", (req, res, next) => {
    throw new Error("abracadabra");
    res.send("User data sent");
});

app.use("/", (err, req, res, next) => {
    // Log your error
    // Best is to handle inside each route using try/catch
    if(err) {
        res.status(500).send("Something went wrong!")
    }
});

// Listening on port 3000
app.listen("3000", () => {
    console.log("Server is listening in port 3000....");
});