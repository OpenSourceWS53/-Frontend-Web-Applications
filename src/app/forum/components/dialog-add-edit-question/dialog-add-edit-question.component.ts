import {Component, Inject, OnInit} from '@angular/core';

import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";

import {MatButton} from "@angular/material/button";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatSnackBar} from "@angular/material/snack-bar";
import {QuestionsService} from "../../services/questions.service";
import {Question} from "../../model/question.entity";

@Component({
  selector: 'app-dialog-add-edit-question',
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
    MatInputModule
  ],
  templateUrl: './dialog-add-edit-question.component.html',
  styleUrl: './dialog-add-edit-question.component.css'
})
export class DialogAddEditQuestionComponent implements OnInit {
  titleAction: string = 'Add';
  buttonAction: string = 'Create';
  formQuestion: FormGroup;
  constructor(
    private dialogReference: MatDialogRef<DialogAddEditQuestionComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private questionService:QuestionsService,
    @Inject(MAT_DIALOG_DATA) public dataQuestion: Question
  ) {

    this.formQuestion= this.fb.group({
      userName: ['', Validators.required],
      category: ['', Validators.required],
      ask: ['', Validators.required]
    })
  }

  addEditQuestion() {
    console.log(this.formQuestion.value);
    let  question: Question = new Question();
    question.userName= this.formQuestion.value.userName;
    question.category = this.formQuestion.value.category;
    question.ask = this.formQuestion.value.ask;

    if(this.dataQuestion==null){
      question.id = 10;
      this.questionService.create(question).subscribe({
        next:(data)=>{
          this.dialogReference.close(true);
        }
      });
    }else{
      question.id= this.dataQuestion.id;
      this.questionService.update(this.dataQuestion.id,question).subscribe({
        next:(data)=>{
          this.dialogReference.close(true);
        }
      });
    }

  }


  ngOnInit() {
    if(this.dataQuestion){

      this.formQuestion.patchValue({
        userName: this.dataQuestion.userName,
        category: this.dataQuestion.category,
        ask: this.dataQuestion.ask
      });

      this.titleAction = 'Edit';
      this.buttonAction = 'Update';
    }
  }
}
