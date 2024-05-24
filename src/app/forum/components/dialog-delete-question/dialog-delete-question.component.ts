import {Component, Inject, OnInit} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
  MatDialogTitle,
  MatDialogClose
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete-question',
  standalone: true,
  imports: [MatFormField, MatInputModule, MatButtonModule, FormsModule, MatDialogContent, MatDialogActions, MatDialogTitle, MatDialogClose],
  templateUrl: './dialog-delete-question.component.html',
  styleUrl: './dialog-delete-question.component.css'
})
export class DialogDeleteQuestionComponent  {
  constructor(
    private dialogReference: MatDialogRef<DialogDeleteQuestionComponent>
  ) {
  }
  onCancel() {
    this.dialogReference.close(null);
  }

  onDeleteQuestion() {
    this.dialogReference.close(true);
  }
}
