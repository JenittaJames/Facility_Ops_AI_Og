import { NextFunction, Request, Response } from "express";
import { JwtService } from "../../infrastructure/services/JwtService";
import { AppError } from "../../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../../shared/enums/HttpStatusCode";


const jwtService = new JwtService();

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new AppError(
                "Authorization token is required",
                HttpStatusCode.UNAUTHORIZED
            );
        }

        const [type, token] = authHeader.split(" ");

        if (type !== "Bearer" || !token) {
            throw new AppError(
                "Invalid authorization format",
                HttpStatusCode.UNAUTHORIZED
            );
        }

        const payload = jwtService.verifyAccessToken(token);

        (req as any).user = payload;

        next();

    } catch (error) {
        next(
            new AppError(
                "Invalid or expired token",
                HttpStatusCode.UNAUTHORIZED
            )
        );
    }
};