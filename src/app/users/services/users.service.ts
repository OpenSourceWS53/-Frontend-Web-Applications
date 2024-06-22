import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user.entity";
import { AuthenticationService } from '../../iam/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService<User> {
  constructor(http: HttpClient, authService: AuthenticationService) {
          super(http, authService);
    this.resourceEndpoint = '/profiles';
    }
  }
