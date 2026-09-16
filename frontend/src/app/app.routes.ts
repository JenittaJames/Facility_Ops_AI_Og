import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path : 'auth',
        loadChildren : ()=> 
            import('./core/routes/auth.route')
        .then(m=>m.authRoutes)
    },
    {
        path : 'user',
        loadChildren : ()=> 
            import('./core/routes/user.route')
        .then(m=>m.userRoutes)
    },
    {
        path : 'admin',
        loadChildren : ()=> 
            import('./core/routes/admin.route')
        .then(m=>m.adminRoute)
    },
    {
        path : 'manager',
        loadChildren : ()=> 
            import('./core/routes/manager.route')
        .then(m=>m.managerRoute)
    },
    {
        path : '',
        redirectTo : 'auth/login',
        pathMatch : 'full'
    }
];
