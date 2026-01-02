const User = require("../models/users-model.js");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    try {
        const { username, email, phone, gender, password, profilePic } = req.body;
        const user = await User.findOne({ username, email });
        if (user) {
            return res.status(500).json({ msg: "User already exist" });
        }
        const hashpassword = bcrypt.hashSync(password, 10);
        const profileBoy = profilePic || `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const profileGirl = profilePic || `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = await User.create({
            username,
            email,
            phone,
            password: hashpassword,
            gender,
            profilePic: gender === "male" ? profileBoy : profileGirl,
        })
        return res.status(200).json({
            msg: "user created successfully",
            userId: newUser._id,
            username:newUser.username,
            email:newUser.email,
            phone:newUser.phone,
            profilePic:newUser.profilePic,
        });
        // if(newUser)AQBKvU297qccEWfa
    } catch (error) {
        return res.status(500).json(error);
        console.log(error);
    }
}

module.exports = register