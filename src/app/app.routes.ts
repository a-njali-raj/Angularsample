import { Routes } from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {
        path:'register' ,component:RegisterComponent
        
    },
    {
        path:'navbar',component:NavbarComponent
    },
    {
        path:'login',component:LoginComponent
    }
];
