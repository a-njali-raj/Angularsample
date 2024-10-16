import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';

import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './index/index.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RegisterComponent,LoginComponent,IndexComponent,RouterLink,RouterLinkActive,ForgotpasswordComponent,FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  
})
export class AppComponent {
  title = 'Angularsample';
}
