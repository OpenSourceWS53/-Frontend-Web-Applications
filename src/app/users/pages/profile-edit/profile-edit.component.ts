import { Component,OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDivider} from "@angular/material/divider";
import {MatList, MatListItem} from "@angular/material/list";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {UsersService} from "../../services/users.service";
import {User} from "../../model/user.entity";
import {NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {DomSanitizer} from '@angular/platform-browser';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [MatCardModule, MatGridListModule, MatDivider, MatList, MatListItem, FormsModule, MatFormFieldModule, MatInputModule, NgIf, MatIcon, MatButton],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css'
})

export class ProfileEditComponent implements OnInit {
  boolName: boolean;
  boolEmail: boolean;
  boolCountry: boolean;
  boolCity: boolean;
  boolPassword: boolean;
  dataLoaded: boolean = false;
  userData: User = new User();

  constructor(private usersServices: UsersService) {
    this.boolName = true;
    this.boolEmail = true;
    this.boolCountry = true;
    this.boolCity = true;
    this.boolPassword = true;
  }

  private getUserData() {
    this.usersServices.getByIdParam("id",1).subscribe((response: any) => {
      this.userData = response;
      console.log(this.userData);
      this.dataLoaded = true;
    });
  }

  changeName() {
    this.boolName = false;
  }

  saveNameChange(){
    this.boolName = true;
  }

  changeEmail() {
    this.boolEmail = false;
  }

  saveEmailChange(){
    this.boolEmail = true;
  }

  changeCountry() {
    this.boolCountry = false;
  }

  saveCountryChange(){
    this.boolCountry = true;
  }

  changeCity() {
    this.boolCity = false;
  }

  saveCityChange(){
    this.boolCity = true;
  }

  changePassword() {
    this.boolPassword = false;
  }

  savePasswordChange(){
    this.boolPassword = true;
  }

  deleteAccount() {
    //
  }

  ngOnInit() {
   this.getUserData();
  }
}
