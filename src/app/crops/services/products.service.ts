import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Product } from "../model/product.entity";
import { AuthenticationService } from '../../iam/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseService<Product>{
  constructor(http: HttpClient, authService: AuthenticationService) {
      super(http, authService);
    this.resourceEndpoint = '/crops/products';
  }
}
