const express = require("express");
const { userAuthorization } = require("../middlewares/auth");
const User = require("../models/user");
const ConnectionRequestModal = require("../models/connnectionRequest");

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", userAuthorization, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const { status, toUserId } = req.params;

        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
            res.status(400).json({
                message: `Invalid status type: ${status}`,
            });
        }

        const toUser = await User.findById(toUserId);
        if (!toUser) {
            res.status(400).json({
                message: `User do notß exists!`,
            });   
        }

        const existingConnection = await ConnectionRequestModal.findOne({
            $or: [
                {fromUserId, toUserId},
                {fromUserId: toUserId, toUserId: fromUserIdß}
            ]
        });
        if (existingConnection) {
            res.status(400).json({
                message: `Connection request already exists!`,
            });
        }

        const connectionRequest = new ConnectionRequestModal({
            fromUserId,
            toUserId,
            status
        });
        const data = await connectionRequest.save();

        res.json({
            message: req.user.firstName + " is " + status + " in " + toUser.firstName,
            data
        });
    } catch (err) {
        res.status(400).send(`ERROR!: ${err.message}`);
    }
});

requestRouter.post("/request/review/:status/:requestId", userAuthorization, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { status, requestId } = req.params;

        const allowedStatus = ["accepted", "rejected"];
        if (!allowedStatus.includes(status)) {
            res.status(400).json({
                message: `Invalid status type: ${status}`,
            });
        }
        const connectionRequest = await ConnectionRequestModal.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested",
        });
        if (!connectionRequest) {
            return res
            .status(404)
            .json({ message: "Connection request not found" });
        }

        connectionRequest.status = status;

        const data = await connectionRequest.save();

        res.json({ message: "Connection request " + status, data });
    } catch (err) {
        res.status(400).send(`ERROR!: ${err.message}`);
    }
});

module.exports = requestRouter;
