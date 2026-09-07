import { UserRole } from "../../../../shared/enums/UserRole";
import { UserType } from "../../../../shared/enums/UserType";


export class User {
    constructor(
        public readonly id: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public phoneNumber: string,
        public password: string,
        public role: UserRole,
        public userType: UserType
    ) {}
}