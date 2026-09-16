import { Routes } from "@angular/router";
import { MainLayout } from "../../layout/main-layout/main-layout";
import { Dashboard } from "../../features/user/dashboard/dashboard";


export const userRoutes : Routes = [
    {
        path : '',
        component : MainLayout,
        children : [
            {
                path : 'dashboard',
                component : Dashboard
            },
        ]
    }
]