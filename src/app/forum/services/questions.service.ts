import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {HttpClient} from "@angular/common/http";
import {Question} from "../model/question.entity";
import { AuthenticationService } from '../../iam/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService extends BaseService<Question> {

  constructor(http: HttpClient, authService: AuthenticationService) {
          super(http, authService);
    this.resourceEndpoint = '/forum/questions';
  }

}
