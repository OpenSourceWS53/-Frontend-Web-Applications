import { Component } from '@angular/core';

import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {FormControl} from '@angular/forms';


import {MatIconModule} from '@angular/material/icon';
import {BaseService} from "../../../shared/services/base.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";


import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {merge} from 'rxjs';
@Component({
  selector: 'app-signup-management',
  standalone: true,
  imports: [MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule, MatIconModule],
  templateUrl: './signup-management.component.html',
  styleUrl: './signup-management.component.css'
})
export class SignupManagementComponent {
  email = new FormControl('', [Validators.required, Validators.email]);

  errorMessage = '';
  hide = true;

  constructor(private _formBuilder: FormBuilder,private baseService: BaseService<any>,private snackBar:MatSnackBar,private router:Router) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }
  firstFormGroup = this._formBuilder.group({
    fullName: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    phoneNumber: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({

    email: ['', [Validators.required,Validators.email]],
    password: ['', Validators.required]
  });
  isLinear = false;
  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.errorMessage = '';
    }
  }
  signUp(){
    if(this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid){
      const user = {
        fullName: this.firstFormGroup.value.fullName,
        phoneNumber: this.secondFormGroup.value.phoneNumber,
        email: this.thirdFormGroup.value.email,
        password: this.thirdFormGroup.value.password
      };
      this.baseService.signUp(user).subscribe({
        next: (response) => {
          console.log('User registration successful:', response);
          this.snackBar.open('Registration successful', 'Close', { duration: 3000 });
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('User registration failed:', error);
          this.snackBar.open('Registration failed', 'Close', { duration: 3000 });
        }
      });

    }
  }
}

