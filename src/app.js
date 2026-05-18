const express = require("express");
const cookieParser = require("cookie-parser");

const connectDb = require("./config/database");

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

const PORT = 3000;

// New expressJS application
// Creating server using expressJS framework
const app = express(); // instance of expressJS application

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDb().then(() => {
    console.log("Database connection established...");
    // Listening on port $PORT
    app.listen(PORT, () => {
        console.log(`Server is listening in port ${PORT}...`);
    });
}, (err) => {
    console.error("Database connection not establishement...");
});
