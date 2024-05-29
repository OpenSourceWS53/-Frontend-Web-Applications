import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { UsersService } from '../../services/users.service'; // Importa UsersService
import { User } from '../../model/user.entity';
import {FormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-user-log-in',
  standalone: true,
  imports: [MatInputModule,MatButtonModule, MatCardModule,MatFormFieldModule,MatIconModule, FormsModule],
  templateUrl: './user-log-in.component.html',
  styleUrl: './user-log-in.component.css'
})
export class UserLogInComponent {
@Output() switchToRegister = new EventEmitter<void>();

  username: string = '';
  password: string = '';

  constructor(private router: Router, private usersService: UsersService) {} // Inject UsersService

onLogIn() {
  console.log('Username:', this.username);
  console.log('Password:', this.password);

  this.usersService.getAll().subscribe((response: any) => {
    console.log('Response:', response);


    const userExists = response.some((user: User) => user.userName === this.username && user.password === this.password); // Asegúrate de que response sea tratado como un array
    console.log('Plz exist:', userExists);

    if (userExists) {
      this.router.navigate(['/home']);
    } else {
      console.log('Invalid username or password');
    }
  });
}
  onSignUp() {
    this.switchToRegister.emit();
  }

}
