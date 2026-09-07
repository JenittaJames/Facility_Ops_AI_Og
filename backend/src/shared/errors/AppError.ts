import { HttpStatusCode } from "../enums/HttpStatusCode";



export class AppError extends Error {
    public readonly statusCode : HttpStatusCode;

    constructor(message : string, statusCode : HttpStatusCode){
        super(message);

        this.statusCode = statusCode;
        this.name = "AppError";
    }
}