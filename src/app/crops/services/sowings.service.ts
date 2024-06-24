import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Sowing } from "../model/sowing.entity";
import { AuthenticationService } from '../../iam/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SowingsService extends BaseService<Sowing>{
  constructor(http: HttpClient, authService: AuthenticationService) {
    super(http, authService);
    this.resourceEndpoint = '/sowings';
  }
}
