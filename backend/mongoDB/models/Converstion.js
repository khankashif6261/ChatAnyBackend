import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
participants: [String],
isAI: Boolean,
createdAt: {type: Date, default: Date.now()}
});

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;