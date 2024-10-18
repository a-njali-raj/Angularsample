import { Routes } from '@angular/router';

import { RegisterComponent } from './components/register/register.component';

import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './index/index.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { WelcomeComponent } from './components/welcome/welcome.component';



export const routes: Routes = [
    {
        path:'',
        redirectTo:'index',
        pathMatch:'full'
    },
    {
        path:'index',
        component:IndexComponent
    },
    {
        path:'register' ,component:RegisterComponent
        
    },
   
    {
        path:'login',component:LoginComponent
    },
    {
        path:'forgotpassword',component:ForgotpasswordComponent
    },
    {
        path:'resetpassword',component:ResetpasswordComponent
    },
    {
        path:'welcome',component:WelcomeComponent
    },
   
   

];
