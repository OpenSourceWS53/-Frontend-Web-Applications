import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {HttpClient} from "@angular/common/http";
import {Disease} from "../model/disease.entity";
import { AuthenticationService } from '../../iam/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DiseasesService extends BaseService<Disease>{

  constructor(http: HttpClient, authService: AuthenticationService) {
    super(http, authService);
    this.resourceEndpoint = '/diseases';
  }

}
