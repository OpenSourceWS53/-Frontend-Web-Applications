import { Injectable } from '@angular/core';
import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {HttpClient} from "@angular/common/http";
import {Answer} from "../model/answer.entity";

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService<Answer> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/users/users';
    }
  }
