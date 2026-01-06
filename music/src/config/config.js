import { config as dotenvConfig } from "dotenv";

dotenvConfig();


const _config = {
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/music',
    JWT_SECRET: process.env.JWT_SECRET || 'secret',
}

export default Object.freeze(_config);