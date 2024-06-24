import { Component, AfterViewInit, OnInit, ViewChild, Input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule, MatTable } from '@angular/material/table'; // Import MatTable
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { NgClass } from "@angular/common";
import { SowingsService } from "../../services/sowings.service";
import { Sowing } from "../../model/sowing.entity";
import { Control } from '../../model/control.entity';
import {SowingControlsCreateAndEditComponent} from "../sowing-controls-create-and-edit/sowing-controls-create-and-edit.component";


@Component({
  selector: 'app-sowings-controls',
  standalone: true,
  imports: [ MatPaginator, MatSort, MatIconModule, MatTableModule, NgClass, SowingControlsCreateAndEditComponent],
  templateUrl: './sowing-controls.component.html',
  styleUrl: './sowing-controls.component.css'
})
export class SowingsControlsComponent implements OnInit, AfterViewInit {
  @Input() sowingId!: number;
  controlData: Control;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['controlDate', 'sowingCondition', 'sowingSoilMoisture', 'sowingStemCondition', 'actions'];
  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>; // Get a reference to the table
  isEditMode: boolean;
  showForm: boolean;

  constructor(private sowingsService: SowingsService) {
    this.isEditMode = false;
    this.showForm = false;
    this.controlData = {} as Control;
    this.dataSource = new MatTableDataSource<any>();
  }

  private resetEditState(): void {
    this.isEditMode = false;
    this.controlData = {} as Control;
  }

  private getAllSowings() {
    this.sowingsService.getControls(this.sowingId).subscribe((response: any) => {
      this.dataSource.data = response;
      console.log(this.dataSource.data);
    });
  };

  // CRUD Actions
  private createControl() {
    this.controlData.controlDate = new Date().toISOString().slice(0,10);
    this.sowingsService.createControl(this.sowingId, this.controlData).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((control: Control) => { return control; });
    });
  };

  private updateControl() {
    let controlToUpdate = this.controlData;
    this.sowingsService.update(this.controlData.id, controlToUpdate).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((control: Control) => {
        if (control.id === response.id) {
          return response;
        }
        return control;
      });
    });
  };

 private deleteControl(controlId: number) {
   console.log('sowingId:', this.sowingId);
   console.log('controlId:', controlId);

   let newData = this.dataSource.data.filter((control: Control) => {
     return control.id !== controlId;
   });
   this.dataSource = new MatTableDataSource(newData);
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;

   this.sowingsService.deleteControl(this.sowingId, controlId).subscribe(() => {
   });
 }

  onEditItem(element: Control) {
    this.isEditMode = true;
    this.showForm = true;
    this.controlData = element;
  }

  onDeleteItem(element: Control) {
    console.log('Control:', element);
    this.deleteControl(element.id);
  }

  onCancelEdit() {
    this.resetEditState();
    this.getAllSowings();
  }

  onControlAdded(event: {sowingId: number, control: Control}) {
    this.controlData = event.control;
    this.createControl();
    this.resetEditState();
  }

  onControlUpdated(event: {sowingId: number, control: Control}) {
    this.controlData = event.control;
    this.updateControl();
    this.resetEditState();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllSowings();
  }
}
