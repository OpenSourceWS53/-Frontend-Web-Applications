import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from "../../shared/services/base.service";
import { Crop } from "../model/crop.entity";
import { AuthenticationService } from '../../iam/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CropsService extends BaseService<Crop> {
  constructor(http: HttpClient, authService: AuthenticationService) {
    super(http, authService);
    this.resourceEndpoint = '/crops';
  }
}
