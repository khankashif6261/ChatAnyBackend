import mongoose from "mongoose";
export async function connectDB() {
    try {
mongoose.connect("mongodb://127.0.0.1/ChatAny");
console.log("Successfully connected to DB");
}catch(err) {
    console.log("Error connecting to DB");
}
}


