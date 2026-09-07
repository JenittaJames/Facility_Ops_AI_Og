import { OtpPurpose } from "../../../../shared/enums/OtpPurpose";
import { RegisterDTO } from "../DTO/authDTO";
import { StoredOtp } from "./storedOtp";


export interface IOtpService {
    generateOtp():string;
    saveOtp(email: string,otp :string, purpose: OtpPurpose, userData: RegisterDTO) : Promise<void>;
    findOtp(email: string, purpose: OtpPurpose) : Promise<StoredOtp|null>;
    verifyOtp(email: string,otp: string, purpose: OtpPurpose) : Promise<boolean>;
    deleteOtp(email: string,purpose: OtpPurpose) : Promise<void>;
}