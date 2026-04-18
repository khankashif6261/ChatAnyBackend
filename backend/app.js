import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io'
import { askAI } from "./ai.js";
import { connectDB } from "./mongoDB/connectDB.js";
import Conversation from "./mongoDB/models/Converstion.js";
const app = express();
const server = new createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }});
app.get("/", (req,res)=> {
    res.send("<h1>Hello World</h1>");
});

io.on("connection",(socket)=>{
    console.log("user connected", socket.id);
socket.on("join-chat",(chatId)=>{
socket.join(chatId);
console.log("User joined a Room", chatId, socket.id);
});
socket.on("send-message",async (data)=>{
io.to(data.chatId).emit("receive-message",data);
const clients = io.sockets.adapter.rooms.get(data.chatId);
const userCount = clients ? clients.size : 0;
if(userCount === 1){
const aiReply = await askAI(data.text, data.chatId);

io.to(data.chatId).emit("receive-message",{

id:Date.now(),
sender:"Riya",
text:aiReply,
time:new Date().toLocaleTimeString([],{
hour:'2-digit',
minute:'2-digit',
hour12:true
}),
status:"seen"

});

}
});

});


server.listen(5000,"0.0.0.0", ()=> {
    console.log("Server is running on port http://localhost:5000");
})