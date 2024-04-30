import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {HttpClient} from "@angular/common/http";
import {Disease} from "../model/disease.entity";

@Injectable({
  providedIn: 'root'
})
export class DiseasesService extends BaseService<Disease>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/diseases';
  }

}
