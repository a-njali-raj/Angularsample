import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  userFirstName: string = '';  
  toasterMessage: string = ''; 
  showToaster: boolean = false;
  isSuccess: boolean = true; 

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    if (!this.userService.getLoginState()) {
      this.router.navigate(['/login']); 
    } else {
      this.userFirstName = this.userService.getUserFirstName();
      this.showToasterMessage('Welcome back!', true); // Show a welcome message
    }
  }

  logout() {
    this.userService.clearUserData(); 
    this.router.navigate(['/login']); 
  }

  
  showToasterMessage(message: string, success: boolean) {
    this.toasterMessage = message;
    this.isSuccess = success; 
    this.showToaster = true;

    setTimeout(() => {
      this.showToaster = false;
    }, 3000); 
  }
}
