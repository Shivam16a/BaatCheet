const jwt = require("jsonwebtoken");
const User = require("../models/users-model.js");

const islogin = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) return res.status(400).json("unauthorized access");

    const jwtToken = token.replace("Bearer ", "");
    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET);
        const userData = User.findById(isVerified.userId).select("-password");
        if(!userData) return res.status(401).json("user not found");
        req.userData = userData;
        next();
    } catch (error) {
        console.log({error:"error in isLogin middleware"});
        return res.status(500).json({msg:"Invalid token"});
    }
}

module.exports = islogin;