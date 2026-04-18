import mongoose from "mongoose";
import Conversation from "./Converstion";

const messageSchema = mongoose.Schema({
     conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation"
  },
    conversationID: String,
    sender: String,
    
})