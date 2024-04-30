import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";

import {MatSnackBar} from "@angular/material/snack-bar";

import {MAT_DATE_FORMATS} from "@angular/material/core";

//*import * as  moment  from 'moment'

import {Answer} from "../../model/answer.entity";
import {AnswersService} from "../../services/answers.service";
import {MatButton} from "@angular/material/button";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

export const MY_DATE_FORTMATS = {
  parse:{
    dateInput:'DD/MM/YYYY'
  },
  display:{
    dateInput:'DD/MM/YYYY',
    monthYearLabel:'MMMM YYYY',
    dateA11yLabel:'LL',
    monthYearA11yLabel:'MMMM YYYY'
  }
}
@Component({
  selector: 'app-dialog-add-answer',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    ReactiveFormsModule,
    MatGridListModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './dialog-add-answer.component.html',
  styleUrl: './dialog-add-answer.component.css',
  providers:[
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORTMATS}
  ]
})
export class DialogAddAnswerComponent {
  formAnswer: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogReference: MatDialogRef<DialogAddAnswerComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private answerService: AnswersService
  ) {
    this.formAnswer = this.fb.group({
      userName: ['', Validators.required],
      content: ['', Validators.required]
    })
  }

  addAnswer() {
    console.log(this.formAnswer.value);
    let answer: Answer = new Answer();
    answer.id =10;
    answer.questionId = this.data.row.id;
    answer.userName = this.formAnswer.value.userName;
    answer.content = this.formAnswer.value.content;


    this.answerService.create(answer).subscribe({
      next:(data)=>{
        this.dialogReference.close("created");
      }
    });
  }
}
