import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Sowing } from "../model/sowing.entity";

@Injectable({
  providedIn: 'root'
})
export class SowingsService extends BaseService<Sowing>{
  constructor(http: HttpClient) {
  super(http);
  this.resourceEndpoint = '/crops/sowings';
  }
}
