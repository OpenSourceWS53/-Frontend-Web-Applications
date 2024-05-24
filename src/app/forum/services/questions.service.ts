import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {HttpClient} from "@angular/common/http";
import {Question} from "../model/question.entity";

@Injectable({
  providedIn: 'root'
})
export class QuestionsService extends BaseService<Question> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/forum/questions';
  }

}
