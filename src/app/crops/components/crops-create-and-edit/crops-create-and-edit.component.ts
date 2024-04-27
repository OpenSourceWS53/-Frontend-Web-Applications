import { Component } from '@angular/core';

import {EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Crop} from "../../model/crop.entity";
import {FormsModule, NgForm} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatFormFieldControl} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {NgIf} from "@angular/common";
@Component({
  selector: 'app-crops-create-and-edit',
  standalone: true,
  imports: [MatFormField, MatInputModule, MatButtonModule, FormsModule, NgIf],
  templateUrl: './crops-create-and-edit.component.html',
  styleUrl: './crops-create-and-edit.component.css'
})
export class CropsCreateAndEditComponent {
  // Attributes
  @Input() crop: Crop;
  @Input() editMode = false;
  @Output() cropAdded = new EventEmitter<Crop>();
  @Output() cropUpdated = new EventEmitter<Crop>();
  @Output() editCanceled = new EventEmitter();
  @ViewChild('cropForm', {static: false}) cropForm!: NgForm;

   // Methods
    constructor() {
      this.crop = {} as Crop;
    }

    // Private methods
     private resetEditState() {
       this.crop = {} as Crop;
       this.editMode = false;
       this.cropForm.resetForm();
     }
     // Event Handlers

      onSubmit() {
        if (this.cropForm.form.valid) {
          let emitter = this.editMode ? this.cropUpdated : this.cropAdded;
          emitter.emit(this.crop);
          this.resetEditState();
        } else {
          console.error('Invalid data in form');
        }
      }

      onCancel() {
        this.editCanceled.emit();
        this.resetEditState();
      }
}
