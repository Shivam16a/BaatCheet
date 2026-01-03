const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    reciverId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    message:{
        type:String,
        required:true
    },
    conversationId:{
        type:mongoose.Schema.ObjectId,
        ref:"Conversation",
        default:[]
    },
},{timestamps:true});

const Message = mongoose.model("Message",messageSchema);
module.exports = Message;