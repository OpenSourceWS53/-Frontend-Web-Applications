import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Crop } from "../model/crop.entity";

@Injectable({
  providedIn: 'root'
})
export class CropsService extends BaseService<Crop>{
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/crops';
  }
}
