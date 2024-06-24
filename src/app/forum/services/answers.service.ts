import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {HttpClient} from "@angular/common/http";
import {Answer} from "../model/answer.entity";
import { AuthenticationService } from '../../iam/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AnswersService extends BaseService<Answer> {

  constructor(http: HttpClient, authService: AuthenticationService) {
        super(http, authService);
    this.resourceEndpoint = '/forum/answers';
  }

  getByQuestionId(id: number) {
    return this.http.get(`${this.resourcePath()}/question/${id}`, this.httpOptions);
  }

}
