
import { OtpPurpose } from "../../../../shared/enums/OtpPurpose";
import { ConflicError } from "../../../../shared/errors/ConflicError";
import { IUserRepository } from "../../domain/IUserRepository";
import { RegisterDTO } from "../DTO/authDTO";
import { IEmailService } from "../interfaces/IEmailService";
import { IOtpService } from "../interfaces/IOtpService";
import { IPasswordHasher } from "../interfaces/IPasswordHasher";


export class RegisterUserUseCase {
    
    constructor(
        private readonly userRepository : IUserRepository,
        private readonly passwordHasher : IPasswordHasher,
        private readonly otpService : IOtpService,
        private readonly emailService : IEmailService
    ){}

    async execute(data:RegisterDTO){

        const existingUser = await this.userRepository.findByEmail(data.email)

        if(existingUser){
            throw new ConflicError("User already exist")
        }


        const hashedPassword = await this.passwordHasher.hash(data.password)

        const registrationData  = {
            ...data,
            password : hashedPassword
        }



        const otp = this.otpService.generateOtp();

        await this.otpService.saveOtp(data.email,otp,OtpPurpose.REGISTRATION,registrationData);

        await this.emailService.sendOtpEmail(data.email,otp)

        console.log("OTP:", otp);

        // return user


        return {
            email: data.email,
            message: "OTP sent successfully"
        };
    }
}