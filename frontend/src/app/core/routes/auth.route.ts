import { Routes } from "@angular/router";
import { AuthLayout } from "../../layout/auth-layout/auth-layout";
import { LoginComponent } from "../../features/auth/login-component/login-component";
import { RegisterComponent } from "../../features/auth/register-component/register-component";
import { OtpComponent } from "../../features/auth/otp-component/otp-component";


export const authRoutes : Routes = [
    {
        path : '',
        component : AuthLayout,
        children : [
            {
                path : 'login',
                component : LoginComponent
            },
            {
                path : 'register',
                component : RegisterComponent
            },
            {
                path : 'verify-otp',
                component : OtpComponent
            }
        ]
    }
]