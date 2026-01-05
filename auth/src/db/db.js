import mongoose from 'mongoose'
import _config from '../config/config.js'

async function connectDB() {
    try {

        await mongoose.connect(_config.MONGO_URI)
        console.log('MongoDB connected')      
    } catch (error) {
        if (error.cause && error.cause.code === 'ECONNREFUSED') {
            console.error('Error: Could not connect to MongoDB. Please ensure that the MongoDB server is running on the specified URI.')
        } else {
            console.log("MongoDB Connection Error:", error)
        }
        process.exit(1)
    }
}

export default connectDB