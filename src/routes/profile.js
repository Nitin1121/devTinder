const express = require("express");
const { userAuthorization } = require("../middlewares/auth");
const { validateProfileEditData } = require("../utils/validation");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuthorization, async (req, res) => {
    try {
        const { user } = req;

        res.send(user);
    } catch(err) {
        res.status(400).send(`ERROR!: ${err.message}`);
    }
});

profileRouter.patch("/profile/edit", userAuthorization, async (req, res) => {
    try {
        const { body } = req;
        if (!validateProfileEditData(body)) {
            throw new Error("Invalid edit request");
        }
        const loggedInUser = req.user;

        Object.keys(body).forEach((key) => loggedInUser[key] = body[key]);

        await loggedInUser.save();

        res.json({
            data: loggedInUser,
            message: "Profile edit successful!"
        })
    } catch (err) {
        res.status(400).send(`ERROR!: ${err.message}`);
    }
});

module.exports = profileRouter;
