import { OtpPurpose } from "../../../../shared/enums/OtpPurpose";
import { RegisterDTO } from "../../application/DTO/authDTO";
import { IOtpService } from "../../application/interfaces/IOtpService";
import { StoredOtp } from "../../application/interfaces/storedOtp";
import { redisClient } from "../database/redis/redisClient";



export class RedisOtpService implements IOtpService {
    private readonly OTP_EXPIRY = 300;

    generateOtp(): string {
        return Math.floor(100000 + Math.random()*900000).toString();
    }

    async saveOtp(email: string, otp: string, purpose: OtpPurpose,userData: RegisterDTO): Promise<void> {
        const key = `otp:${purpose}:${email}`;

        const storedData: StoredOtp = {
            otp,
            purpose,
            userData
        };

        await redisClient.set(
            key,
            JSON.stringify(storedData),
            {
                EX: this.OTP_EXPIRY
            }
        );
    }



    async findOtp(
        email: string,
        purpose: OtpPurpose
    ): Promise<StoredOtp | null> {

        const key = `otp:${purpose}:${email}`;

        const storedOtp = await redisClient.get(key);

        if (!storedOtp) {
            return null;
        }

        return JSON.parse(storedOtp) as StoredOtp;
    }


    

    async verifyOtp(email: string, otp: string,purpose:OtpPurpose): Promise<boolean> {
        const key = `otp:${purpose}:${email}`;

        const storedOtp = await redisClient.get(key);

        if(!storedOtp){
            return false;
        }

        return storedOtp === otp;
    }


    async deleteOtp(email: string,purpose: OtpPurpose): Promise<void> {
        const key = `otp:${purpose}:${email}`;
        await redisClient.del(key)
    }


}