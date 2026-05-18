const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("./models/user");
const connectDb = require("./config/database");
const { userAuthorization, adminAuthorization } = require("./middlewares/auth");
const { validateSignupData, validateSigninData } = require("./utils/validation");

const PORT = 3000;

// New expressJS application
// Creating server using expressJS framework
const app = express(); // instance of expressJS application

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
    try {
        const { body } = req;
        const { lastName, firstName, username, password } = body;

        validateSignupData(body);

        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            username,
            password: passwordHash
        });

        await user.save();
        res.send("User added successfully");
    } catch(err) {
        res.status(400).send(`ERROR!: ${err.message}`);
    }
});

app.post("/signin", async (req, res) => {
    try {
        const { body } = req;
        const { username, password } = body;

        validateSigninData(body);

        const user = await User.findOne({ username: username });
        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword) {
            throw new Error("Invalid credentials");
        } else {
            const token = jwt.sign({ _id: user._id}, "DEVTINDER@123", { expiresIn: "1d" });
            res.cookie("token", token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000)});
            res.send("Login successful!")
        }
    } catch (err) {
        res.status(400).send(`ERROR!: ${err.message}`);
    }
});

app.get("/profile", async (req, res) => {
    try {
        const { user } = req;

        res.send(user);
    } catch(err) {
        res.status(400).send(`ERROR!: ${err.message}`);
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

app.patch("/user/:userId", async (req, res) => {
    const data = req.body;
    const userId = req.params?.userId;
    try {
        const allowedUpdates = ["age", "gender", "about", "skills"];
        const isUpdateAllowed = Object.keys(data).every((k) => allowedUpdates.includes(k));
        if (!isUpdateAllowed) {
            throw new Error("Update not allowed");
        }
        if(data?.skills.length > 10) {
            throw new Error("Skills cant be more than 10");
        }
        await User.findByIdAndUpdate(userId, data, {
            runValidators: true,
            returnDocument: "after"
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
