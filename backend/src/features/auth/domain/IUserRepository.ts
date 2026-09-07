import { RegisterDTO } from "../application/DTO/authDTO";
import { User } from "./entities/User";



export interface IUserRepository {
    createUser(data:RegisterDTO) : Promise<User>
    findByEmail(email:string) : Promise<User|null>
}