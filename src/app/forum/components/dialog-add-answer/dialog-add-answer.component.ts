import {Component, EventEmitter, Inject, Input, Output, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {NgIf} from "@angular/common";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Answer} from "../../model/answer.entity";


@Component({
  selector: 'app-dialog-add-answer',
  standalone: true,
  imports: [MatFormField, MatInputModule, MatButtonModule, FormsModule, NgIf],
  templateUrl: './dialog-add-answer.component.html',
  styleUrl: './dialog-add-answer.component.css',
})
export class DialogAddAnswerComponent {
  // Attributes
  answer: Answer;
  editMode: boolean;
  @ViewChild('answerForm', {static: false}) answerForm!: NgForm;

  constructor(private dialogReference: MatDialogRef<DialogAddAnswerComponent>,@Inject(MAT_DIALOG_DATA) public data: { answer: Answer, isEditMode: boolean }) {
    this.answer = { ...(data.answer || {}) };
    this.editMode = data.isEditMode;
  }

  // Event Handlers

  onSubmit() {
    if (this.answerForm.form.valid) {
      this.dialogReference.close(this.answer);
    } else {
      console.error('Invalid data in form');
    }
  }

  onCancel() {
    this.dialogReference.close(null);
  }

}
