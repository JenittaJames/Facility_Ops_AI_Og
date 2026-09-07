import { HttpStatusCode } from "../../../../shared/enums/HttpStatusCode";
import { AppError } from "../../../../shared/errors/AppError";
import { IUserRepository } from "../../domain/IUserRepository";
import { VerifyOtpDTO } from "../DTO/authDTO";
import { IOtpService } from "../interfaces/IOtpService";


export class VerifyOtpUseCase {
    constructor(
        private readonly otpService : IOtpService,
        private readonly userRepository : IUserRepository
    ){}

    async execute(data: VerifyOtpDTO) : Promise<boolean> {

        const storedOtp = await this.otpService.findOtp(data.email,data.purpose);

        if (!storedOtp) {
            throw new AppError("OTP not found or expired",HttpStatusCode.BAD_REQUEST);
        }

        if (storedOtp.otp !== data.otp) {
            throw new AppError("Invalid OTP",HttpStatusCode.BAD_REQUEST);
        }

        await this.userRepository.createUser(storedOtp.userData);

        await this.otpService.deleteOtp(data.email,data.purpose)

        return true
    }
}