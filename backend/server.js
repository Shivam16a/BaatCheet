const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const app = express();
dotenv.config();
app.use(express.json());






const PORT = process.env.PORT || 5001;

app.listen(PORT,()=>{
    console.log(`server is running on port : ${PORT}`);
    connectDB();
});