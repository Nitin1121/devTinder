const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
        enum: {
            values: ["male", "female", "others"],
            message: "${VALUE} is incorrect gender type"
        }
        // validate: (value) => {
        //     if(![].includes(value)) {
        //         throw new Error("Gender data is not valid");
        //     }
        // }
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate: (value) => {
            if(!validator.isEmail(value)) {
                throw new Error("Email address is not valid");
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
                throw new Error("Photo url is not valid");
            }
        }
    },
}, { timestamps: true });

userSchema.methods.getJwt = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id}, "DEVTINDER@123", { expiresIn: "1d" });
    return token;
};

userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
