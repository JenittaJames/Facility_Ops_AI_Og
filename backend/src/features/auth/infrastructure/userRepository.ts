import { RegisterDTO } from "../application/DTO/authDTO";
import { User } from "../domain/entities/User";
import { IUserRepository } from "../domain/IUserRepository";
import { UserModel } from "./userSchema";



export class UserRepository implements IUserRepository {
    async createUser(data: RegisterDTO): Promise<User> {
        const user = await UserModel.create(data)
        return user
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({email})
        return user
    }
}