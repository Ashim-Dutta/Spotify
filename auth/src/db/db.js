import mongoose from 'mongoose'
import _config from '../../config/config'

async function connectDB() {
    try {

        await mongoose.connect(_config.MONGO_URI)
        console.log('MongoDB connected')      
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB