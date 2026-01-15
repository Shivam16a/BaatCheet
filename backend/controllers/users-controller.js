const User = require('../models/users-model.js');
const Conversation = require('../models/conversation-model.js');

const searchUsers = async (req, res) => {
    try {
        const search = req.query.search || '';
        const CurrentUserId = req.user._id;
        const user = await User.find({
            $and: [
                {
                    $or: [
                        { username: { $regex: '.*' + search + '.*', $options: 'i' } },
                    ]
                }, {
                    _id: { $ne: CurrentUserId }
                }
            ]
        }).select('-password');

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Error from users controller search users' });
    }
};

const getCurrentChatters = async (req, res) => {
    try {
        const currentUserId = req.user._id;

        // 1️⃣ Recent conversations (active chats top pe)
        const conversations = await Conversation.find({
            participants: currentUserId
        }).sort({ updatedAt: -1 });

        if (!conversations.length) {
            return res.status(200).json([]);
        }

        // 2️⃣ Unique other participant IDs (Set use kiya)
        const userIdSet = new Set();

        conversations.forEach(convo => {
            convo.participants.forEach(id => {
                if (id.toString() !== currentUserId.toString()) {
                    userIdSet.add(id.toString());
                }
            });
        });

        const otherUserIds = Array.from(userIdSet);

        // 3️⃣ Users fetch
        const users = await User.find({
            _id: { $in: otherUserIds }
        }).select('-password');

        // 4️⃣ Order maintain karna (recent chat wale upar)
        const orderedUsers = otherUserIds
            .map(id => users.find(u => u._id.toString() === id))
            .filter(Boolean); // ❗ undefined remove

        return res.status(200).json(orderedUsers);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error from users controller get current chatters'
        });
    }
};


module.exports = { searchUsers, getCurrentChatters };