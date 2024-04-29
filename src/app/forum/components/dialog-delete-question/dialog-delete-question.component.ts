import {Component, Inject, OnInit} from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogTitle
} from "@angular/material/dialog";

import {Question} from "../../model/question.entity";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatInput} from "@angular/material/input";
import {QuestionsService} from "../../services/questions.service";

@Component({
  selector: 'app-dialog-delete-question',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatGridList,
    MatGridTile,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './dialog-delete-question.component.html',
  styleUrl: './dialog-delete-question.component.css'
})
export class DialogDeleteQuestionComponent implements OnInit {
  constructor(
    private dialogReference: MatDialogRef<DialogDeleteQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public dataQuestion: Question,
    private questionService:QuestionsService
  ) {
  }

  ngOnInit(): void {
  }

  deleteQuestion() {
    if (this.dataQuestion) {
      this.questionService.delete(this.dataQuestion.id).subscribe((response: any) => {
        this.dialogReference.close(true);
      });
    }

  }
}
