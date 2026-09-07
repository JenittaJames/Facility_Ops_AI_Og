import { HttpStatusCode } from "../enums/HttpStatusCode";
import { AppError } from "./AppError";


export class ConflicError extends AppError {
    constructor(message : string = "Resource already exists") {
        super(message,HttpStatusCode.CONFLICT);
    }
}