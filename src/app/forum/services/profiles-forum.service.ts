import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../../iam/services/authentication.service";
import {BaseService} from "../../shared/services/base.service";
import {ProfileForum} from "../model/profile-forum.entity";

@Injectable({
  providedIn: 'root'
})
export class ProfilesForumService extends BaseService<ProfileForum>{

  constructor(http: HttpClient, authService: AuthenticationService) {
    super(http, authService);
    this.resourceEndpoint = '/profiles';
  }
}
