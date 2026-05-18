const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuthorization = async (req, res, next) => {
    try {
        const { cookies } = req;
        const { token } = cookies;
        if(!token) {
            throw new Error("Invalid token")
        }

        const decodedJwt = await jwt.verify(cookies.token, "DEVTINDER@123");

        const { _id } = decodedJwt;

        const user = await User.findById(_id);
        if(!user) {
            throw new Error("User doesnt exist")
        }
        req.user = user;
        
        next();
    } catch(err) {
        res.status(400).send(`ERROR!: ${err.message}`);
    }
};

const adminAuthorization = (req, res, next) => {
    console.log("Admin auth is getting checked")
    const authorizationToken = "xyz"; // req.body?.token
    const isAdminAuthorized = authorizationToken === "xyz";
    if (!isAdminAuthorized) {
        res.status(401).send("Unauthorized request")
    } else {
        next();
    }
};

module.exports = {
    userAuthorization,
    adminAuthorization
};
