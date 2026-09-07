import { IPasswordHasher } from "../../application/interfaces/IPasswordHasher";
import bcrypt from "bcrypt"


export class BcryptPasswordHasher implements IPasswordHasher {
    private readonly strength = 10

    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password,this.strength)
    }

    async compare(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password,hashedPassword)
    }
    
}