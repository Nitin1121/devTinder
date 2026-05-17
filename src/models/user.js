const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    lastName: {
        type: String
    },
    firstName: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;