import { UnauthorizedError } from "../../../../shared/errors/UnauthorizedError";
import { ValidationError } from "../../../../shared/errors/ValidationError";
import { IUserRepository } from "../../domain/IUserRepository";
import { LoginDTO } from "../DTO/authDTO";
import { IJwtService } from "../interfaces/IJwtService";
import { IPasswordHasher } from "../interfaces/IPasswordHasher";



export class LoginUserUseCase {
    constructor(
        private readonly userRepository : IUserRepository,
        private readonly passwordHasher : IPasswordHasher,
        private readonly jwtService : IJwtService
    ){}


    async execute(data:LoginDTO){
        const user = await this.userRepository.findByEmail(data.email)

        if(!user){
            throw new UnauthorizedError("User not found. Register now.")
        }

        const isMatch = await this.passwordHasher.compare(data.password,user.password)

        if(!isMatch){
            throw new ValidationError("Password doesn't match.")
        }

        const payload = {
            userId: user.id.toString(),
            email: user.email,
            role: user.role
        };

        const accessToken = this.jwtService.generateAccessToken(payload);

        const refreshToken = this.jwtService.generateRefreshToken(payload);

        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                userType: user.userType
            }
        };
    }

}