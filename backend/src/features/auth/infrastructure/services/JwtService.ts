import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IJwtService } from "../../application/interfaces/IJwtService";
import { JwtPayload } from "../../application/interfaces/JwtPayload";

dotenv.config()

export class JwtService implements IJwtService {

    generateAccessToken(payload: JwtPayload): string {

        const secret = process.env.JWT_ACCESS_SECRET;

        if (!secret) {
            throw new Error("JWT_ACCESS_SECRET is not defined");
        }

        return jwt.sign(
            payload,
            secret,
            {
                expiresIn: "15m"
            }
        );
    }


    generateRefreshToken(payload: JwtPayload): string {

        const secret = process.env.JWT_REFRESH_SECRET;

        if (!secret) {
            throw new Error("JWT_REFRESH_SECRET is not defined");
        }

        return jwt.sign(
            payload,
            secret,
            {
                expiresIn: "7d"
            }
        );
    }


    verifyAccessToken(token: string): JwtPayload {

        const secret = process.env.JWT_ACCESS_SECRET;

        if (!secret) {
            throw new Error("JWT_ACCESS_SECRET is not defined");
        }

        return jwt.verify(
            token,
            secret
        ) as JwtPayload;
    }


    verifyRefreshToken(token: string): JwtPayload {

        const secret = process.env.JWT_REFRESH_SECRET;

        if (!secret) {
            throw new Error("JWT_REFRESH_SECRET is not defined");
        }

        return jwt.verify(
            token,
            secret
        ) as JwtPayload;
    }
}