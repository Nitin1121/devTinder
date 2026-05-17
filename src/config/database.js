const mongoose = require("mongoose");

const connectDb = async () => {
    await mongoose.connect("mongodb+srv://nitin:oRacSSsYPqEeXADR@namastenode.npqn1xs.mongodb.net/devTinder");
};

module.exports = connectDb;
