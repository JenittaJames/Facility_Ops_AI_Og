import { NextFunction, Request, Response } from "express";
import { RegisterUserUseCase } from "../application/useCases/registerUserUseCase";
import { ApiResponse } from "../../../shared/responses/ApiResponse";
import { HttpStatusCode } from "../../../shared/enums/HttpStatusCode";
import { LoginUserUseCase } from "../application/useCases/loginUserUseCase";
import { VerifyOtpUseCase } from "../application/useCases/verifyOtpUseCase";
import { ResendOtpUseCase } from "../application/useCases/resendOtpUseCase";
import { RefreshTokenUseCase } from "../application/useCases/refreshTokenUseCase";



export class AuthController {
    constructor(
        private readonly registerUserUseCase : RegisterUserUseCase,
        private readonly loginUserUseCase : LoginUserUseCase,
        private readonly verifyOtpUseCase : VerifyOtpUseCase,
        private readonly resendOtpUseCase : ResendOtpUseCase,
        private readonly refreshTokenUseCase : RefreshTokenUseCase
    ){}



    async register(req:Request,res:Response,next:NextFunction){
        try {
            const data = req.body
            const user = await this.registerUserUseCase.execute(data);

            const response : ApiResponse<typeof user> = {
                success : true,
                message : "OTP send successfully",
                data : user
            };

            res.status(HttpStatusCode.CREATED).json(response)

        } catch (error) {
            next(error)
        }
    }



    async verifyOtp(req:Request,res:Response,next:NextFunction){
        try {
            const data = req.body

            const result = await this.verifyOtpUseCase.execute(data);

            const response : ApiResponse<typeof result> = {
                success : true,
                message : "OTP verified successfully",
                data : result
            }
            
            res.status(HttpStatusCode.OK).json(response)

        } catch (error) {
            next(error)
        }
    }




    async resendOtp(req:Request,res:Response,next:NextFunction) {
        try {
            const {email,purpose} = req.body

            const result = await this.resendOtpUseCase.execute(email,purpose)

            const response : ApiResponse<typeof result> = {
                success : true,
                message : "OTP verified successfully",
                data : result
            }

            res.status(HttpStatusCode.OK).json(response)

        } catch (error) {
            next(error)
        }
    }
    



    async login(req:Request,res:Response,next:NextFunction){
        try {
            const data = req.body
            const user = await this.loginUserUseCase.execute(data);


            const response : ApiResponse<typeof user> = {
                success : true,
                message : "Login successfull",
                data : user
            }
            
            res.status(HttpStatusCode.OK).json(response)

        } catch (error) {
            next(error)
        }
    }



    async refreshToken(req:Request,res:Response,next:NextFunction){
        try {
            const { refreshToken } = req.body;

        const result =
            await this.refreshTokenUseCase.execute(refreshToken);

        const response: ApiResponse<typeof result> = {
            success: true,
            message: "Access token refreshed successfully",
            data: result
        };

        res.status(HttpStatusCode.OK).json(response);

        } catch (error) {
            next(error)
        }
    }


}
