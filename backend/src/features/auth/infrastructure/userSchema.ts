import mongoose, { Document, Schema } from "mongoose"
import { UserRole } from "../../../shared/enums/UserRole"
import { UserType } from "../../../shared/enums/UserType"

export interface IUserDocument extends Document{
    firstName : string,
    lastName : string,
    email : string,
    phoneNumber : string,
    password : string
    role : UserRole,
    userType : UserType,
    status : boolean,
    createdAt : Date
    updatedAt : Date
}


const userSchema = new Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    phoneNumber : {
        type : Number,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true,
        enum : ["user","admin","facility_manager"],
        default : "user"
    },
    userType : {
        type : String,
        enum : ["individual","company","team"]
    },
    status : {
        type : Boolean
    }
},{timestamps : true})


export const UserModel = mongoose.model<IUserDocument>("User",userSchema)