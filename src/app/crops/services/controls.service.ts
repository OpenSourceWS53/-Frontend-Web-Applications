import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Control } from "../model/control.entity";
import { AuthenticationService } from '../../iam/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ControlsService extends BaseService<Control>{
   constructor(http: HttpClient, authService: AuthenticationService) {
     super(http, authService);
     this.resourceEndpoint = `/sowings/${sowingId}/controls`;
  }
}
