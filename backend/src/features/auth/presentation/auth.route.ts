import express from "express"
import { UserRepository } from "../infrastructure/userRepository"
import { RegisterUserUseCase } from "../application/useCases/registerUserUseCase"
import { BcryptPasswordHasher } from "../infrastructure/services/BcryptPasswordHasher"
import { AuthController } from "./auth.controller"
import { LoginUserUseCase } from "../application/useCases/loginUserUseCase"
import { RedisOtpService } from "../infrastructure/services/RedisOtpService"
import { VerifyOtpUseCase } from "../application/useCases/verifyOtpUseCase"
import { NodemailerEmailService } from "../infrastructure/services/NodemailerEmailService"




const router = express.Router()



const userRepository = new UserRepository()
const passwordHasher = new BcryptPasswordHasher()
const otpService = new RedisOtpService()
const emailService = new NodemailerEmailService()


const registerUserUseCase = new RegisterUserUseCase(userRepository,passwordHasher,otpService,emailService);
const verifyOtpUseCase = new VerifyOtpUseCase(otpService,userRepository);
const loginUserUseCase = new LoginUserUseCase(userRepository,passwordHasher);

const authController = new AuthController(
    registerUserUseCase,
    loginUserUseCase,
    verifyOtpUseCase
)


router.post('/register',authController.register.bind(authController));
router.post('/login',authController.login.bind(authController));
router.post('/verify-otp',authController.verifyOtp.bind(authController));


export default router