import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  userFirstName: string = '';  // Variable to hold user's first name

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    // Check if the user is logged in
    if (!this.userService.getLoginState()) {
      this.router.navigate(['/login']); // Redirect to login if not logged in
    } else {
      // Get the logged-in user's first name
      this.userFirstName = this.userService.getUserFirstName();
    }
  }

  logout() {
    this.userService.clearUserData(); 
    this.router.navigate(['/login']); 
  }
}
