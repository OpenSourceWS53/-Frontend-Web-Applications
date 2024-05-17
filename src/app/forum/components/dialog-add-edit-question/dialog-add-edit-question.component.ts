import {Component, EventEmitter, Inject, Input, Output, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {NgIf} from "@angular/common";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Question} from "../../model/question.entity";

@Component({
  selector: 'app-dialog-add-edit-question',
  standalone: true,
  imports: [MatFormField, MatInputModule, MatButtonModule, FormsModule, NgIf],
  templateUrl: './dialog-add-edit-question.component.html',
  styleUrl: './dialog-add-edit-question.component.css'
})
export class DialogAddEditQuestionComponent  {
  // Attributes
  question: Question;
  editMode: boolean;
  @ViewChild('questionForm', {static: false}) questionForm!: NgForm;

  constructor(private dialogReference: MatDialogRef<DialogAddEditQuestionComponent>,@Inject(MAT_DIALOG_DATA) public data: { question: Question, isEditMode: boolean }) {
    this.question = { ...(data.question || {}) };
    this.editMode = data.isEditMode;
  }

  // Event Handlers

  onSubmit() {
    if (this.questionForm.form.valid) {
      this.dialogReference.close(this.question);
    } else {
      console.error('Invalid data in form');
    }
  }

  onCancel() {
    this.dialogReference.close(null);
  }

}
