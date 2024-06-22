import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Care } from "../model/care.entity";
import { AuthenticationService } from '../../iam/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CaresService extends BaseService<Care>{
  constructor(http: HttpClient, authService: AuthenticationService) {
    super(http, authService);
      this.resourceEndpoint = '/cares';
    }
}
