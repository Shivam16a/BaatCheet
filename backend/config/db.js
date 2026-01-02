const mongoose = require('mongoose');

const connectDB = async (req, res)=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("database connected successfully");
    } catch (error) {
        console.log(`database connection fail:${error}`);
        process.exit(0);
    }
}

module.exports = connectDB;