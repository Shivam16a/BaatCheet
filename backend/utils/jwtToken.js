const jwt = require('jsonwebtoken');

const generatToken = (user) => {
    return jwt.sign(
        {
            userId: user._id.toString(),
            email: user.email,
            username: user.username,
            gender: user.gender,
            profilePic: user.profilePic,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '30d',
        }
    );
};

module.exports = generatToken;
