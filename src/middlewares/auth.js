const userAuthorization = (req, res, next) => {
    console.log("User auth is getting checked")
    const authorizationToken = "xyz"; // req.body?.token
    const isAdminAuthorized = authorizationToken === "xyz";
    if (!isAdminAuthorized) {
        res.status(401).send("Unauthorized request")
    } else {
        next();
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
