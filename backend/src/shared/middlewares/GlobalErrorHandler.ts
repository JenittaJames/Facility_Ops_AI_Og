import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { HttpStatusCode } from "../enums/HttpStatusCode";
import { ApiResponse } from "../responses/ApiResponse";



export const globalErrorHandler = (error : unknown, req : Request, res : Response, next : NextFunction) =>{

    if(error instanceof AppError) {
        const response : ApiResponse<null> = {
            success : false,
            message : error.message
        };
        return res.status(error.statusCode).json(response);
    }

    console.error(error)


    const response: ApiResponse<null> = {
        success : false,
        message : "Internal server error"
    };
    
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(response);

}