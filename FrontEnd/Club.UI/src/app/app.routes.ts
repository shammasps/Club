import { Routes } from '@angular/router';
import { Home } from './modules/fifa-world-cup/pages/home/home';
import { Login } from './modules/fifa-world-cup/auth/login/login';
import { Register } from './modules/fifa-world-cup/auth/register/register';
import { Profile } from './modules/fifa-world-cup/pages/profile/profile';
import { Predict } from './modules/fifa-world-cup/pages/predict/predict';
import { Results } from './modules/fifa-world-cup/pages/results/results';
import { Leaderboard } from './modules/fifa-world-cup/pages/leaderboard/leaderboard';
import { MatchScheduleSync } from './modules/fifa-world-cup/pages/match-schedule-sync/match-schedule-sync';
import { PredictionReportService } from './core/services/prediction-report-services/report-service';
import { Report } from './modules/fifa-world-cup/pages/report/report';

export const routes: Routes = [
    
     { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    {path:'signup',component:Register},
    {path:'home',component:Home},
    {path: 'profile',component: Profile},
    {path: 'predict',component: Predict},
    {path: 'results',component: Results},
    {path: 'leaderboard',component: Leaderboard},
    {path:'match-sync',component: MatchScheduleSync},
    {path:'prediction-report',component:Report},

    { path: '**', redirectTo: 'login' },
];
