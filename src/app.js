const express = require("express");
const User = require("./models/user");
const connectDb = require("./config/database");
const { userAuthorization, adminAuthorization } = require("./middlewares/auth");

const PORT = 3000;

// New expressJS application
// Creating server using expressJS framework
const app = express(); // instance of expressJS application

app.post("/signup", async (req, res) => {
    const user = new User({
        firstName: "Naveen",
        lastName: "Vignesh",
        username: "testing@gmail.com",
        password: "Testing@123"
    });
    try {
        await user.save();
        res.send("User added successfully");
    } catch(err) {
        res.status(500).send("Error saving the user", err);
    }
});

connectDb().then(() => {
    console.log("Database connection established...");
    // Listening on port $PORT
    app.listen(PORT, () => {
        console.log(`Server is listening in port ${PORT}...`);
    });
}, (err) => {
    console.error("Database connection not establishement...");
});
