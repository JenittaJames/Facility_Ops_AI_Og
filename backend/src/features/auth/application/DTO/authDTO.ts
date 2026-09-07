import { OtpPurpose } from "../../../../shared/enums/OtpPurpose";
import { UserRole } from "../../../../shared/enums/UserRole";
import { UserType } from "../../../../shared/enums/UserType";



export interface RegisterDTO {
    firstName : string;
    lastName : string;
    email : string;
    phoneNumber : string;
    password : string;
    role ?: UserRole;
    userType ?: UserType;
}



export interface LoginDTO {
    email : string;
    password : string;
    role ?: UserRole
}



export interface VerifyOtpDTO {
    email: string;
    otp: string;
    purpose: OtpPurpose
}


