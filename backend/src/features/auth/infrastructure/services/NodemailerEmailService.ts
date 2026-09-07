import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { IEmailService } from "../../application/interfaces/IEmailService";


dotenv.config()


export class NodemailerEmailService implements IEmailService {

    private transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    async sendOtpEmail(
        email: string,
        otp: string
    ): Promise<void> {

        await this.transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your Registration OTP",
            text: `Your OTP is ${otp}. It will expire in 5 minutes.`
        });
    }
}