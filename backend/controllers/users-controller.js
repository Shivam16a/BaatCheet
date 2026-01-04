const User = require("../models/users-model.js");

const searchUsers = async (req, res) => {
    try {
        const search = req.query.search || ``;
        const CurrentUserId = req.userData._id;
        const user = await User.find({
            $and:[
                {
                    $or:[
                        {username:{$regex:`.*`+search+`.*`,$options:`i`}},
                    ]
                },{
                    _id:{$ne:CurrentUserId}
                }
            ]
        }).select("-password")

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error from users controller" });
    }
};

module.exports = searchUsers;