import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {HttpClient} from "@angular/common/http";
import {Subscription} from "../model/subscription.entity";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService extends BaseService<Subscription> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/users/subscriptions';
    }

  }
