import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {HttpClient} from "@angular/common/http";
import {Pest} from "../model/pest.entity";
import { AuthenticationService } from '../../iam/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PestsService extends BaseService<Pest>{

constructor(http: HttpClient, authService: AuthenticationService) {
super(http, authService);
this.resourceEndpoint = '/pests';
}
}


