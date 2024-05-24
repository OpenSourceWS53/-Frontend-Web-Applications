import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { NgIf } from "@angular/common";

import { Sowing } from "../../model/sowing.entity";

@Component({
  selector: 'app-sowings-create-and-edit',
  standalone: true,
  imports: [MatFormField, MatInputModule, MatButtonModule, FormsModule, NgIf],
  templateUrl: './sowings-create-and-edit.component.html',
  styleUrl: './sowings-create-and-edit.component.css'
})
export class SowingsCreateAndEditComponent {
  @Input() sowing: Sowing;
  @Input() editMode = false;
  @Output() sowingAdded = new EventEmitter<Sowing>();
  @Output() sowingUpdated = new EventEmitter<Sowing>();
  @Output() editCanceled = new EventEmitter();
  @ViewChild('sowingForm', {static: false}) sowingForm!: NgForm;

  constructor() {
    this.sowing = {} as Sowing;
  }

  private resetEditState() {
    this.sowing = {} as Sowing;
    this.editMode = false;
    this.sowingForm.resetForm();
  }

  onSubmit() {
    if (this.sowingForm.form.valid) {
      if (!this.editMode) {
        this.sowing.phenological_phase = 'Germination';
        let startDate = new Date(this.sowing.start_date);
        let harvestDate = new Date(startDate.setMonth(startDate.getMonth() + 6));
        this.sowing.harvest_date = harvestDate.toISOString().split('T')[0];
      }
      let emitter = this.editMode ? this.sowingUpdated : this.sowingAdded;
      emitter.emit(this.sowing);
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
