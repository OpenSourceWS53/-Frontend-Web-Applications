import { Component, Output, EventEmitter } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [MatInputModule,MatButtonModule, MatCardModule,MatFormFieldModule,MatIconModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {
 @Output() switchToLogin = new EventEmitter<void>();

  onLogin() {
    this.switchToLogin.emit();
  }
}
