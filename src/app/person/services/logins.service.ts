import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Login} from "../model/login.entity";

@Injectable({
  providedIn: 'root'
})
export class LoginsService extends BaseService<Login> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/logins';
  }
}
