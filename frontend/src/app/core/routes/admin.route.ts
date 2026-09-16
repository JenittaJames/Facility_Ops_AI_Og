import { Routes } from "@angular/router";
import { MainLayout } from "../../layout/main-layout/main-layout";
import { Dashboard } from "../../features/admin/dashboard/dashboard";


export const adminRoute : Routes = [
    {
            path : '',
            component : MainLayout,
            children : [
                {
                    path : 'dashboard',
                    component : Dashboard
                }
            ]
        }
]