import { Component, AfterViewInit, OnInit, ViewChild, Input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
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
  displayedColumns: string[] = ['id', 'soil', 'stem', 'leave', 'date','actions'];
  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;
  isEditMode: boolean;

  constructor(private sowingsService: SowingsService) {
    this.isEditMode = false;
    this.controlData = {} as Control;
    this.dataSource = new MatTableDataSource<any>();
  }

  private resetEditState(): void {
    this.isEditMode = false;
    this.controlData = {} as Control;
  }

  private getAllSowings() {
    this.sowingsService.getAll().subscribe((response: any) => {
      const sowing = response.find((sowing: Sowing) => sowing.id === this.sowingId);
      if (sowing) {
        this.dataSource.data = sowing.controls;
      }
    });
  };

  // CRUD Actions
  private createControl() {
    this.sowingsService.create(this.controlData).subscribe((response: any) => {
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
    this.sowingsService.delete(controlId).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((control: Control) => {
        return control.id !== controlId ? control : false;
      });
    });
  };

  onEditItem(element: Control) {
    this.isEditMode = true;
    this.controlData = element;
  }

  onDeleteItem(element: Control) {
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
