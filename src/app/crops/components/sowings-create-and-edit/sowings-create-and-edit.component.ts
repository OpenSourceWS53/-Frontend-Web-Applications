import { Component, EventEmitter, Input, Output, ViewChild, OnInit } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { CropsService } from "../../services/crops.service";
import { Crop } from '../../model/crop.entity';
import { CommonModule } from "@angular/common";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Sowing, PhenologicalPhase } from "../../model/sowing.entity";

export interface SowingRequest {
  cropId: number;
  areaLand: number;
}

@Component({
  selector: 'app-sowings-create-and-edit',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
    MatSelectModule
  ],
  templateUrl: './sowings-create-and-edit.component.html',
  styleUrls: ['./sowings-create-and-edit.component.css']
})
export class SowingsCreateAndEditComponent implements OnInit {
  @Input() sowing: Sowing;
  @Input() editMode = false;
  @Output() sowingAdded = new EventEmitter<SowingRequest>();
  @Output() sowingUpdated = new EventEmitter<SowingRequest>();
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
      let newSowing: SowingRequest = {
        cropId: this.sowing.cropId,
        areaLand: this.sowing.areaLand
      };
      let emitter = this.editMode ? this.sowingUpdated : this.sowingAdded;
      emitter.emit(newSowing);
      this.resetEditState();
    } else {
      console.error('Invalid data in form');
    }
  }

  ngOnInit() {
    this.cropsService.getAll().pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(error);
      })
    ).subscribe(crops => {
      this.crops = crops;
    });
  }
  onCancel() {
    this.editCanceled.emit();
    this.resetEditState();
  }
}
