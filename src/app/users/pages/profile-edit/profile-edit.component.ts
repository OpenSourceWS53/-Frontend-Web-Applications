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
  newName: string;
  newEmail: string;
  newCountry: string;
  newCity: string;
  newPassword: string;

  constructor(private usersServices: UsersService) {
    this.boolName = true;
    this.boolEmail = true;
    this.boolCountry = true;
    this.boolCity = true;
    this.boolPassword = true;
    this.newName = "";
    this.newEmail = "";
    this.newCountry = "";
    this.newCity = "";
    this.newPassword = "";
  }
  private buildData(userData: User){
    this.newName = userData.firstName + " " + userData.lastName;
    this.newEmail = userData.email;
    this.newCountry = "Country";
    this.newCity = "City";
    this.newPassword = userData.password;
  }
  private getUserData() {
    this.usersServices.getByIdParam("id",1).subscribe((response: any) => {
      this.userData = response[0];
      this.buildData(this.userData);
      this.dataLoaded = true;
    });
  }

  changeName() {
    this.boolName = false;
  }

  saveNameChange(newName: string){
    this.boolName = true;
    console.log(newName);
  }

  changeEmail() {
    this.boolEmail = false;
  }

  saveEmailChange(newEmail: string){
    this.boolEmail = true;
  }

  changeCountry() {
    this.boolCountry = false;
  }

  saveCountryChange(newCountry: string){
    this.boolCountry = true;
  }

  changeCity() {
    this.boolCity = false;
  }

  saveCityChange(newCity: string){
    this.boolCity = true;
  }

  changePassword() {
    this.boolPassword = false;
  }

  savePasswordChange(newPassword: string){
    this.boolPassword = true;
  }

  deleteAccount() {
    //
  }

  ngOnInit() {
  this.getUserData();
  this.newName = this.userData?.firstName + " " + this.userData?.lastName;
}
}
