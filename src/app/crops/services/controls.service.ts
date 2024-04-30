import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Control } from "../model/control.entity";

@Injectable({
  providedIn: 'root'
})
export class ControlsService extends BaseService<Control>{
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/controls';
  }
}
