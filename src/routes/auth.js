const bcrypt = require("bcrypt");
const express = require("express");
const User = require("../models/user");
const { validateSignupData, validateSigninData } = require("../utils/validation");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
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
        res.send("Signup successful!");
    } catch(err) {
        res.status(400).send(`ERROR!: ${err.message}`);
    }
});

authRouter.post("/signin", async (req, res) => {
    try {
        const { body } = req;
        const { username, password } = body;

        validateSigninData(body);

        const user = await User.findOne({ username: username });
        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isValidPassword = await user.validatePassword(password);
        if(!isValidPassword) {
            throw new Error("Invalid credentials");
        } else {
            const token = await user.getJwt();
            res.cookie("token", token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000)});
            res.send("Signin successful!")
        }
    } catch (err) {
        res.status(400).send(`ERROR!: ${err.message}`);
    }
});

authRouter.post("/logout", async (req, res) => {
    try {
        res.cookie("token", null, { expires: new Date(Date.now()) });
        res.send("Logout successful!");
    } catch (err) {
        res.status(400).send(`ERROR!: ${err.message}`);
    }
});

module.exports = authRouter;
