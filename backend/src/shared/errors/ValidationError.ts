import { HttpStatusCode } from "../enums/HttpStatusCode";
import { AppError } from "./AppError";


export class ValidationError extends AppError {
    constructor(message : string = "Validation error") {
        super(message,HttpStatusCode.BAD_REQUEST)
    }
}

