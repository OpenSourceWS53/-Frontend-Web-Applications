import { Component } from '@angular/core';

import {EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Control} from "../../model/control.entity";
import {FormsModule, NgForm} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatFormFieldControl} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {NgIf} from "@angular/common";
@Component({
  selector: 'app-controls-create-and-edit',
  standalone: true,
  imports: [MatFormField, MatInputModule, MatButtonModule, FormsModule, NgIf],
  templateUrl: './crop-controls-create-and-edit.component.html',
  styleUrl: './crop-controls-create-and-edit.component.css',
})
export class ControlsCreateAndEditComponent {
  // Attributes
  @Input() control: Control;
  @Input() editMode = false;
  @Output() controlAdded = new EventEmitter<Control>();
  @Output() controlUpdated = new EventEmitter<Control>();
  @Output() editCanceled = new EventEmitter();
  @ViewChild('controlForm', {static: false}) controlForm!: NgForm;
  showForm = false;

  // Methods
  constructor() {
    this.control = {} as Control;
  }

  // Private methods
  private resetEditState() {
    this.control = {} as Control;
    this.editMode = false;
    this.controlForm.resetForm();
  }
  // Event Handlers

  onSubmit() {
    if (this.controlForm.form.valid) {
      let emitter = this.editMode ? this.controlUpdated : this.controlAdded;
      emitter.emit(this.control);
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
