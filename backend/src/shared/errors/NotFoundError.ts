import { HttpStatusCode } from "../enums/HttpStatusCode";
import { AppError } from "./AppError";


export class NotFoundError extends AppError {
    constructor(message : string = "Resource not found") {
        super(message,HttpStatusCode.NOT_FOUND);
    }
}

