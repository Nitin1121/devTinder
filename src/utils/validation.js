const validator = require("validator");

const validateSignupData = (data) => {
    const { lastName, firstName, username, password } = data;
    if (!lastName || !firstName) {
        throw new Error("Name is not valid");
    } else if (!validator.isEmail(username)) {
        throw new Error("Email address is not valid");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong password");
    }
};

const validateSigninData = (data) => {
    const { username, password } = data;
    if (!validator.isEmail(username)) {
        throw new Error("Email address is not valid");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong password");
    }
};

module.exports = {
    validateSignupData,
    validateSigninData
};
