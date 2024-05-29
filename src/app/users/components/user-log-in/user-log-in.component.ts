import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-user-log-in',
  standalone: true,
  imports: [MatButtonModule, MatCardModule,MatFormFieldModule,MatIconModule],
  templateUrl: './user-log-in.component.html',
  styleUrl: './user-log-in.component.css'
})
export class UserLogInComponent {
  @Output() switchToRegister = new EventEmitter<void>();

  constructor(private router: Router) {}
  onLogIn() {
    this.router.navigate(['/home']);
  }

  onSignUp() {
    this.switchToRegister.emit();
  }
}
