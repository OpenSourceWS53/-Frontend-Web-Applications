import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRegisterComponent} from "../../components/user-register/user-register.component";
import {UserLogInComponent} from "../../components/user-log-in/user-log-in.component";
@Component({
  selector: 'app-login-and-signup-management',
  standalone: true,
  imports: [UserRegisterComponent,UserLogInComponent,CommonModule],
  templateUrl: './login-and-signup-management.component.html',
  styleUrl: './login-and-signup-management.component.css'
})
export class LoginAndSignupManagementComponent {
    showLogin = true;

    onSwitchToRegister() {
      this.showLogin = false;
    }

    onSwitchToLogin() {
      this.showLogin = true;
    }
}
