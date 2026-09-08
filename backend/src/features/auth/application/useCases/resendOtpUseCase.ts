import { HttpStatusCode } from "../../../../shared/enums/HttpStatusCode";
import { OtpPurpose } from "../../../../shared/enums/OtpPurpose";
import { AppError } from "../../../../shared/errors/AppError";
import { IEmailService } from "../interfaces/IEmailService";
import { IOtpService } from "../interfaces/IOtpService";


export class ResendOtpUseCase {
    constructor(
        private readonly otpService : IOtpService,
        private readonly emailService : IEmailService
    ){}


    async execute(email :string,purpose:OtpPurpose) : Promise<void> {
        const storedOtp = await this.otpService.findOtp(email,purpose);

        if(!storedOtp){
            throw new AppError("OTP session expired.",HttpStatusCode.BAD_REQUEST)
        }

        const newOtp = this.otpService.generateOtp();

        await this.otpService.saveOtp(email,newOtp,purpose,storedOtp.userData);


        await this.emailService.sendOtpEmail(email,newOtp);
    }
}