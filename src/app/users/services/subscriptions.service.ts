import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {HttpClient} from "@angular/common/http";
import {Subscription} from "../model/subscription.entity";
import { AuthenticationService } from '../../iam/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService extends BaseService<Subscription> {

  constructor(http: HttpClient, authService: AuthenticationService) {
            super(http, authService);
    this.resourceEndpoint = '/users/subscriptions';
    }

  }
