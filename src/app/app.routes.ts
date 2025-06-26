import { Routes } from '@angular/router';
import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TimeVisualizerComponent } from './time-visualizer/time-visualizer.component';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

export const routes: Routes = [
    { 
        path: 'login', 
        component: LoginComponent, 
        canActivate: [AuthGuard], 
        data: { authGuardPipe: redirectLoggedInToHome } 
    },
    { 
        path: 'signup', 
        component: RegisterComponent, 
        canActivate: [AuthGuard], 
        data: { authGuardPipe: redirectLoggedInToHome } 
    },
    { 
        path: '', 
        component: TimeVisualizerComponent, 
        canActivate: [AuthGuard], 
        data: { authGuardPipe: redirectUnauthorizedToLogin } 
    },
    { path: '**', redirectTo: '' } // Redirect any unknown paths to the home component

];
