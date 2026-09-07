
import { OtpPurpose } from "../../../../shared/enums/OtpPurpose";
import { RegisterDTO } from "../DTO/authDTO";


export interface StoredOtp {
    otp: string;
    purpose: OtpPurpose;
    userData: RegisterDTO;
}