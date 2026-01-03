const User = require("../models/users-model.js");
const bcrypt = require("bcryptjs");
const generatToken = require("../utils/jwtToken.js");

const register = async (req, res) => {
    try {
        const { username, email, phone, gender, password, profilePic } = req.body;

        const userExist = await User.findOne({
            $or: [{ username }, { email }],
        });

        if (userExist) {
            return res.status(409).json({ msg: "User already exists" });
        }

        const hashpassword = bcrypt.hashSync(password, 10);
        const encodedUsername = encodeURIComponent(username);
        const defaultProfilePic =
            gender === "male"
                ? `https://avatar.iran.liara.run/public/boy?username=${encodedUsername}`
                : `https://avatar.iran.liara.run/public/girl?username=${encodedUsername}`;

        const newUser = await User.create({
            username,
            email,
            phone,
            password: hashpassword,
            gender,
            profilePic: profilePic || defaultProfilePic,
        });

        return res.status(201).json({
            msg: "User created successfully",
            token: generatToken(newUser._id),
            userId: newUser._id.toString(),
            username: newUser.username,
            email: newUser.email,
            phone: newUser.phone,
            profilePic: newUser.profilePic,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(401).json({ msg: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, userExist.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid email or password" });
        }

        return res.status(200).json({
            msg: "Login success",
            token: generatToken(userExist._id),
            userId: userExist._id.toString(),
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

module.exports = { register, login };