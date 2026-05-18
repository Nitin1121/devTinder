const express = require("express");
const { userAuthorization } = require("../middlewares/auth");

const profileRouter = express.Router();

profileRouter.get("/profile", async (req, res) => {
    try {
        const { user } = req;

        res.send(user);
    } catch(err) {
        res.status(400).send(`ERROR!: ${err.message}`);
    }
});

module.exports = profileRouter;
