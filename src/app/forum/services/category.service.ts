import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Category} from "../model/category.entity";
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../../iam/services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<Category>{

  constructor(http: HttpClient, authService: AuthenticationService) {
    super(http, authService);
    this.resourceEndpoint = '/forum/categories';
  }
}
