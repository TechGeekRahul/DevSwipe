const express = require("express");
const app = express();
const connectDb = require("./config/database");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const cors = require("cors");
// const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser")
// const {validateSignUpData} = require("./utils/validation");
const authRouter = require("./routes/authRoute");
const profileRouter = require("./routes/profileRoute");
const requestRouter = require("./routes/request")
const userRouter = require("./routes/user")
require("dotenv").config();

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        const allowedOrigins = ["https://dev-swipe-rahul.vercel.app/", "http://16.171.33.120"];
        const isLocal = origin.startsWith("http://localhost:") ||
            origin.startsWith("http://127.0.0.1:") ||
            origin.match(/^http:\/\/192\.168\.\d+\.\d+(:\d+)?$/) ||
            origin.match(/^http:\/\/10\.\d+\.\d+\.\d+(:\d+)?$/);
        if (allowedOrigins.indexOf(origin) !== -1 || isLocal) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(express.json())
app.use(cookieParser())

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter)
app.use("/", userRouter)



app.use('/', (err, req, res, next) => {
    if (err) {
        console.error("Server error:", err);
        res.status(500).send("Something went wrong")
    }
})

// Get port from environment variable or use 3000 as default
const PORT = process.env.PORT || 3000;

connectDb().then(() => {
    console.log("connected to mongodb successfully")
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}).catch(err => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
})


