import express, { json, urlencoded } from "express";
import "dotenv/config";
import { WinstonLogger } from "./shared/infrastructure/logging/WinstonLogger";
import authRouter from "./features/auth/presentation/auth.route"
import { globalErrorHandler } from "./shared/middlewares/GlobalErrorHandler";

const logger = new WinstonLogger()

export function connectApp(){
    const app = express()


    app.use(urlencoded({extended:true}))
    app.use(json())


    app.use('/api/auth',authRouter)

    app.use(globalErrorHandler)
    
    app.listen(3000,()=>{
        logger.info("Server running")
    })
}