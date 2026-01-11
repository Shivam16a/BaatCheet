const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const authRoute = require("./routes/auth-route.js");
const messageRoute = require("./routes/message-route.js");
const userRoute = require("./routes/users-route.js");
const cors = require("cors");


const corsOptions = {
    origin: "http://localhost:5173/",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
};


const app = express();
dotenv.config();
app.use(express.json());
app.use(cors(corsOptions))

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);
app.use("/api/user", userRoute);



const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`server is running on port : ${PORT}`);
    connectDB();
});