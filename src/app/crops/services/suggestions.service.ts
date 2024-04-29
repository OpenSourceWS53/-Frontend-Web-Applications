import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Care } from "../model/care.entity";
@Injectable({
  providedIn: 'root'
})
export class SuggestionsService extends BaseService<Care>{
  constructor(http: HttpClient) {
      super(http);
      this.resourceEndpoint = '/cares';
    }
}
