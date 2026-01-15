const Conversation = require('../models/conversation-model.js');
const Message = require('../models/message-model.js');
const { getReceiverSocketId, io } = require('../socket/socket.js');
const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: reciverId } = req.params;
        const senderId = req.user._id;

        let chats = await Conversation.findOne({
            participants: { $all: [senderId, reciverId] }
        });
        if (!chats) {
            chats = await Conversation.create({
                participants: [reciverId, senderId],
            });
        }

        const newMessage = new Message({
            senderId,
            reciverId,
            message,
            conversationId: chats._id
        });

        chats.messages.push(newMessage._id);

        await Promise.all([chats.save(), newMessage.save()]);
        //SOCKET.IO function

        const reciverSocketId = getReceiverSocketId(reciverId);
        if(reciverSocketId){
            io.to(reciverSocketId).emit('newMessage',newMessage);
        }
        return res.status(201).json(newMessage);
    } catch (error) {
        console.error(error);
        return res.status(400).json('Error from message controller sendMessage');
    }
};

const getMessages = async (req, res) => {
    try {
        const { id: reciverId } = req.params;
        const senderId = req.user._id;

        const chats = await Conversation.findOne({
            participants: { $all: [senderId, reciverId] }
        }).populate('messages');

        if (!chats) {
            return res.status(200).json([]);
        }
        const message = chats.messages;
        return res.status(200).json(message);
    } catch (error) {
        console.error(error);
        return res.status(400).json('Error from message controller getMessage');
    }
};

module.exports = { sendMessage, getMessages };