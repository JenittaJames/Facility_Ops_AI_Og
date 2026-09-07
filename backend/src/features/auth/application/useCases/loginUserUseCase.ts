import { UnauthorizedError } from "../../../../shared/errors/UnauthorizedError";
import { ValidationError } from "../../../../shared/errors/ValidationError";
import { IUserRepository } from "../../domain/IUserRepository";
import { LoginDTO } from "../DTO/authDTO";
import { IPasswordHasher } from "../interfaces/IPasswordHasher";



export class LoginUserUseCase {
    constructor(
        private readonly userRepository : IUserRepository,
        private readonly passwordHasher : IPasswordHasher
    ){}


    async execute(data:LoginDTO){
        const existingUser = await this.userRepository.findByEmail(data.email)

        if(!existingUser){
            throw new UnauthorizedError("User not found. Register now.")
        }

        const isMatch = await this.passwordHasher.compare(data.password,existingUser.password)

        if(!isMatch){
            throw new ValidationError("Password doesn't match.")
        }

        return existingUser
    }

}