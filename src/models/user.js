const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    lastName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        validate: (value) => {
            if(!["male", "female", "others"].includes(value)) {
                throw new Error("Gender data is not valid");
            }
        }
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    about: {
        type: String,
        default: "A default about of the user"
    },
    skills: {
        type: [String]
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;