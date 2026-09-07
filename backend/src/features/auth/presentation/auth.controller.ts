import { NextFunction, Request, Response } from "express";
import { RegisterUserUseCase } from "../application/useCases/registerUserUseCase";
import { ApiResponse } from "../../../shared/responses/ApiResponse";
import { HttpStatusCode } from "../../../shared/enums/HttpStatusCode";
import { LoginUserUseCase } from "../application/useCases/loginUserUseCase";
import { VerifyOtpUseCase } from "../application/useCases/verifyOtpUseCase";



export class AuthController {
    constructor(
        private readonly registerUserUseCase : RegisterUserUseCase,
        private readonly loginUserUseCase : LoginUserUseCase,
        private readonly verifyOtpUseCase : VerifyOtpUseCase
    ){}



    async register(req:Request,res:Response,next:NextFunction){
        try {
            const data = req.body
            const user = await this.registerUserUseCase.execute(data);

            const response : ApiResponse<typeof user> = {
                success : true,
                message : "User created successfully",
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

            const user = await this.verifyOtpUseCase.execute(data);

            const response : ApiResponse<typeof user> = {
                success : true,
                message : "OTP verified successfully",
                data : user
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


}
