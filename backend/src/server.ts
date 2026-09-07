import { connectApp } from "./app";
import { connectDB } from "./config/db";
import { redisClient } from "./features/auth/infrastructure/database/redis/redisClient";


connectApp();
connectDB();
redisClient.connect();