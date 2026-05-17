const express = require("express");
const User = require("./models/user");
const connectDb = require("./config/database");
const { userAuthorization, adminAuthorization } = require("./middlewares/auth");

const PORT = 3000;

// New expressJS application
// Creating server using expressJS framework
const app = express(); // instance of expressJS application

app.use(express.json());

app.post("/signup", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User added successfully");
    } catch(err) {
        res.status(400).send(`Something went wrong!: ${err.message}`);
    }
});

app.get("/user", async (req, res) => {
    const userName = req.body.username;
    try {
        const users = await User.find({ username: userName });

        if (!users.length) {
            res.status(404).send("User not found");
        } else {
            res.send(users);
        }

        // const user = await User.findOne({ username: userName });

        // if (!user) {
        //     res.status(404).send("User not found");
        // } else {
        //     res.send(user);
        // }
    } catch(err) {
        res.status(400).send(`Something went wrong! ${err.message}`);
    }
});

app.get("/users", async (req, res) => {
    try {
        const users = await User.find();

        if (!users.length) {
            res.status(404).send("User not found");
        } else {
            res.send(users);
        }
    } catch(err) {
        res.status(400).send(`Something went wrong! ${err.message}`);
    }
});

app.patch("/user", async (req, res) => {
    const data = req.body;
    const userId = req.body.userId;
    try {
        await User.findByIdAndUpdate(userId, data, {
            runValidators: true
        });
        res.send("User updated successfully");
    } catch(err) {
        res.status(400).send(`Something went wrong! ${err.message}`);
    }
});

app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    } catch(err) {
        res.status(400).send(`Something went wrong! ${err.message}`);
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
