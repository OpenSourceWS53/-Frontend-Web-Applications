import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Sowing } from "../../model/sowing.entity";
import { FormsModule } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { NgIf } from "@angular/common";
import { Control } from "../../model/control.entity";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-sowing-controls-create-and-edit',
  standalone: true,
  imports: [MatFormField, MatInputModule, MatButtonModule, FormsModule, NgIf],
  templateUrl: './sowing-controls-create-and-edit.component.html',
  styleUrl: './sowing-controls-create-and-edit.component.css',
})
export class SowingControlsCreateAndEditComponent {
  @Input() control: Control;
  @Input() sowingId!: number;
  @Input() editMode = false;
  @Output() controlAdded = new EventEmitter<{sowingId: number, control: Control}>();
  @Output() controlUpdated = new EventEmitter<{sowingId: number, control: Control}>();
  @Output() editCanceled = new EventEmitter();
  @ViewChild('controlForm', {static: false}) controlForm!: NgForm;
  showForm = false;

  constructor() {
    this.control = {} as Control;
  }

  private resetEditState() {
    this.control = {} as Control;
    this.editMode = false;
    this.controlForm.resetForm();
  }

  onSubmit() {
    if (this.controlForm.form.valid) {
      let emitter = this.editMode ? this.controlUpdated : this.controlAdded;
      emitter.emit({sowingId: this.sowingId, control: this.control});
      this.resetEditState();
    } else {
      console.error('Invalid data in form');
    }
    this.showForm = false;
  }

  onCancel() {
    this.editCanceled.emit();
    this.resetEditState();
    this.showForm = false;
  }
}
