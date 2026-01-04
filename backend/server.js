const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const authRoute = require("./routes/auth-route.js");
const messageRoute = require("./routes/message-route.js");
const userRoute = require("./routes/users-route.js");


const app = express();
dotenv.config();
app.use(express.json());

app.use("/api/auth",authRoute);
app.use("/api/message",messageRoute);
app.use("/api/user",userRoute);



const PORT = process.env.PORT || 5001;
app.listen(PORT,()=>{
    console.log(`server is running on port : ${PORT}`);
    connectDB();
});