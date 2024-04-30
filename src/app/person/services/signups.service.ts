import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Signup} from "../model/signup.entity";

@Injectable({
  providedIn: 'root'
})
export class SignupsService extends BaseService<Signup> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/signups';
  }
}
