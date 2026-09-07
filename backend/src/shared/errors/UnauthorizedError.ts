import { HttpStatusCode } from "../enums/HttpStatusCode";
import { AppError } from "./AppError";


export class UnauthorizedError extends AppError {
    constructor(message : string = "Unauthorized") {
        super(message,HttpStatusCode.UNAUTHORIZED);
    }
}