const mongoose = require("mongoose");
const validator = require("validator");

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
        lowercase: true,
        validate: (value) => {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid email address");
            }
        }
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
    },
    photoUrl: {
        type: String,
        validate: (value) => {
            if(!validator.isUrl(value)) {
                throw new Error("Invalid photo url");
            }
        }
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;