import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from "../../shared/services/base.service";
import { ControlCrop } from "../model/control-crop.entity";

@Injectable({
  providedIn: 'root'
})
export class ControlsToCropService extends BaseService<ControlCrop> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/controls';
  }
}
