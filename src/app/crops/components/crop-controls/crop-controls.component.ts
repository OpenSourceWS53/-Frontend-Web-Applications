import { Component } from '@angular/core';
import { AfterViewInit, OnInit, ViewChild} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { NgClass } from "@angular/common";
import { ControlsService } from "../../services/controls.service";
import { Control } from "../../model/control.entity";
import {
  ControlsCreateAndEditComponent
} from "../crop-controls-create-and-edit/crop-controls-create-and-edit.component";


@Component({
  selector: 'app-crops-controls',
  standalone: true,
  imports: [
    MatPaginator, MatSort, MatIconModule, MatTableModule, NgClass, ControlsCreateAndEditComponent
  ],
  templateUrl: './crop-controls.component.html',
  styleUrl: './crop-controls.component.css'
})
export class CropsControlsComponent implements OnInit, AfterViewInit {
  controlData: Control;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'soil', 'stem', 'leave', 'date','actions'];
  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;
  isEditMode: boolean;

  // Constructor
  constructor(private controlsService: ControlsService) {
    this.isEditMode = false;
    this.controlData = {} as Control;
    this.dataSource = new MatTableDataSource<any>();
  }

  // Private Methods
  private resetEditState(): void {
    this.isEditMode = false;
    this.controlData = {} as Control;
  }

  // CRUD Actions

  private getAllControls() {
    this.controlsService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  };

  private createControl() {
    this.controlsService.create(this.controlData).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((control: Control) => { return control; });
    });
  };

  private updateControl() {
    let controlToUpdate = this.controlData;
    this.controlsService.update(this.controlData.id, controlToUpdate).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((student: Control) => {
        if (student.id === response.id) {
          return response;
        }
        return student;
      });
    });
  };

  private deleteControl(controlId: number) {
    this.controlsService.delete(controlId).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((control: Control) => {
        return control.id !== controlId ? control : false;
      });
    });
  };

  // UI Event Handlers

  onEditItem(element: Control) {
    this.isEditMode = true;
    this.controlData = element;
  }

  onDeleteItem(element: Control) {
    this.deleteControl(element.id);
  }

  onCancelEdit() {
    this.resetEditState();
    this.getAllControls();
  }

  onControlAdded(element: Control) {
    this.controlData = element;
    this.createControl();
    this.resetEditState();
  }

  onControlUpdated(element: Control) {
    this.controlData = element;
    this.updateControl();
    this.resetEditState();
  }

  // Lifecycle Hooks

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllControls();
  }

}
