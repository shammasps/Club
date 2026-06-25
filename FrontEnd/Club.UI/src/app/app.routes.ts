import { Routes } from '@angular/router';
import { Home } from './modules/fifa-world-cup/pages/home/home';
import { Login } from './modules/fifa-world-cup/auth/login/login';
import { Register } from './modules/fifa-world-cup/auth/register/register';
import { Profile } from './modules/fifa-world-cup/pages/profile/profile';

export const routes: Routes = [
    
     { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    {path:'signup',component:Register},
    {path:'home',component:Home},
    {path: 'profile',component: Profile},

    { path: '**', redirectTo: 'login' },
];
