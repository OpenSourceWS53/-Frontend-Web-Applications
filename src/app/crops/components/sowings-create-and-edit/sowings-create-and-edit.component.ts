import { Component, EventEmitter, Input, Output, ViewChild, OnInit } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select"; // Add this
import { CropsService } from "../../services/crops.service";
import { Crop } from '../../model/crop.entity';
import { CommonModule } from "@angular/common"; // Add this
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Sowing } from "../../model/sowing.entity";

@Component({
  selector: 'app-sowings-create-and-edit',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    CommonModule, // Add this
    MatSelectModule // Add this
  ],
  templateUrl: './sowings-create-and-edit.component.html',
  styleUrls: ['./sowings-create-and-edit.component.css']
})
export class SowingsCreateAndEditComponent implements OnInit {
  @Input() sowing: Sowing;
  @Input() editMode = false;
  @Output() sowingAdded = new EventEmitter<Sowing>();
  @Output() sowingUpdated = new EventEmitter<Sowing>();
  @Output() editCanceled = new EventEmitter();
  @ViewChild('sowingForm', {static: false}) sowingForm!: NgForm;
  crops: Crop[] = [];

  constructor(private cropsService: CropsService) {
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



  ngOnInit() {
    this.cropsService.getAll().pipe(
      catchError(error => {
        console.error('Error:', error);
        console.log("hola");
        return throwError(error);
      })
    ).subscribe(crops => {
      console.log(crops);
      console.log("hola");
      this.crops = crops;
    });
  }
  onCancel() {
    this.editCanceled.emit();
    this.resetEditState();
  }
}
