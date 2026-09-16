import { Routes } from "@angular/router";
import { MainLayout } from "../../layout/main-layout/main-layout";
import { Dashboard } from "../../features/facility-manager/dashboard/dashboard";


export const managerRoute : Routes = [
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