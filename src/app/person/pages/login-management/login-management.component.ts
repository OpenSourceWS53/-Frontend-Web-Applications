import { Component } from '@angular/core';

import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {merge} from 'rxjs';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

import {LoginCreateAndEditComponent} from "../../components/login-create-and-edit/login-create-and-edit.component";
import { NgClass } from "@angular/common";
import {BaseService} from "../../../shared/services/base.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-management',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule, FormsModule,
    ReactiveFormsModule,MatIconModule,MatButtonModule,
    MatDividerModule,MatPaginator,MatSort,
    LoginCreateAndEditComponent,NgClass],
  templateUrl: './login-management.component.html',
  styleUrl: './login-management.component.css'
})
export class LoginManagementComponent  {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide = true;
  //mail = new FormControl('', [Validators.required, Validators.email]);
  errorMessage = '';
  constructor(private baseService: BaseService<any>, private router: Router) {
    merge(this.email.statusChanges, this.email.valueChanges, this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }
  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.errorMessage = '';
    }
  }
  login() {

    if (this.email?.value && this.password?.value) {
      this.baseService.authenticate(this.email.value, this.password.value).subscribe({
        next: (response) => {
          this.router.navigate(['/house']); // Cambiar '/dashboard' a la ruta deseada
        },
        error: (error) => {
          console.error('Authentication failed:', error);
        }
      });

    }
  }

}
