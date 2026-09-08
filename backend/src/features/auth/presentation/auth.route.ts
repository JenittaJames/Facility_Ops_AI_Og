import express from "express"
import { UserRepository } from "../infrastructure/userRepository"
import { RegisterUserUseCase } from "../application/useCases/registerUserUseCase"
import { BcryptPasswordHasher } from "../infrastructure/services/BcryptPasswordHasher"
import { AuthController } from "./auth.controller"
import { LoginUserUseCase } from "../application/useCases/loginUserUseCase"
import { RedisOtpService } from "../infrastructure/services/RedisOtpService"
import { VerifyOtpUseCase } from "../application/useCases/verifyOtpUseCase"
import { NodemailerEmailService } from "../infrastructure/services/NodemailerEmailService"
import { ResendOtpUseCase } from "../application/useCases/resendOtpUseCase"
import { JwtService } from "../infrastructure/services/JwtService"
import { RefreshTokenUseCase } from "../application/useCases/refreshTokenUseCase"




const router = express.Router()



const userRepository = new UserRepository()
const passwordHasher = new BcryptPasswordHasher()
const otpService = new RedisOtpService()
const emailService = new NodemailerEmailService()
const jwtService = new JwtService()


const registerUserUseCase = new RegisterUserUseCase(userRepository,passwordHasher,otpService,emailService);
const verifyOtpUseCase = new VerifyOtpUseCase(otpService,userRepository);
const loginUserUseCase = new LoginUserUseCase(userRepository,passwordHasher,jwtService);
const resendOtpUseCase = new ResendOtpUseCase(otpService,emailService);
const refreshTokenUseCase = new RefreshTokenUseCase(jwtService)

const authController = new AuthController(
    registerUserUseCase,
    loginUserUseCase,
    verifyOtpUseCase,
    resendOtpUseCase,
    refreshTokenUseCase
)


router.post('/register',authController.register.bind(authController));
router.post('/login',authController.login.bind(authController));
router.post('/verify-otp',authController.verifyOtp.bind(authController));
router.post('/resend-otp',authController.resendOtp.bind(authController));
router.post('/refresh-token',authController.refreshToken.bind(authController));


export default router