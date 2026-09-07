import mongoose from "mongoose"
import dotenv from "dotenv"
import { WinstonLogger } from "../shared/infrastructure/logging/WinstonLogger"


const logger = new WinstonLogger()

dotenv.config()
const MONGO_URI : string = process.env.MONGO_URI!

export async function connectDB(){
    try {
        await mongoose.connect(MONGO_URI)
        logger.info("DB connected")
    } catch (error) {
        logger.error("MongoDB connection error: ",error)
    }
}