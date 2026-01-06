import mongoose from "mongoose";
import config from "../config/config.js";



async function connectDB() {
    try {

        await mongoose.connect(config.MONGO_URL);
        console.log("MongoDB connected");
        
    } catch (error) {
        console.log("MongoDB connection error", error);
        process.exit(1);
    }
}

export default connectDB;
