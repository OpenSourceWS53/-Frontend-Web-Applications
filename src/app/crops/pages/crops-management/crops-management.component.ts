import { Component } from '@angular/core';

import { AfterViewInit, OnInit, ViewChild} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { NgClass } from "@angular/common";

import {CropsService} from "../../services/crops.service";
import {Crop} from "../../model/crop.entity";
import {CropsCreateAndEditComponent} from "../../components/crops-create-and-edit/crops-create-and-edit.component";


@Component({
  selector: 'app-crops-management',
  standalone: true,
  imports: [MatPaginator, MatSort, MatIconModule, CropsCreateAndEditComponent, MatTableModule, NgClass],
  templateUrl: './crops-management.component.html',
  styleUrl: './crops-management.component.css'
})
export class CropsManagementComponent implements OnInit, AfterViewInit {
// Attributes
  cropData: Crop;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'plantedDate', 'harvestDate', 'phenologicalPhase', 'plantedArea','actions'];
  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;
  isEditMode: boolean;

  // Constructor
  constructor(private cropService: CropsService) {
    this.isEditMode = false;
    this.cropData = {} as Crop;
    this.dataSource = new MatTableDataSource<any>();
  }
 // Private Methods
  private resetEditState(): void {
    this.isEditMode = false;
    this.cropData = {} as Crop;
  }

  // CRUD Actions
 private getAllCrops() {
    this.cropService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  };

  private createCrop() {
    this.cropService.create(this.cropData).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((crop: Crop) => { return crop; });
    });
  };

  private updateCrop() {
    let cropToUpdate = this.cropData;
    this.cropService.update(this.cropData.id, cropToUpdate).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((crop: Crop) => {
        if (crop.id === response.id) {
          return response;
        }
        return crop;
      });
    });
  };

  private deleteCrop(cropId: number) {
    this.cropService.delete(cropId).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((crop: Crop) => {
        return crop.id !== cropId ? crop : false;
      });
    });
  };

// UI Event Handlers

  onEditItem(element: Crop) {
    this.isEditMode = true;
    this.cropData = element;
  }

  onDeleteItem(element: Crop) {
    this.deleteCrop(element.id);
  }

  onCancelEdit() {
    this.resetEditState();
    this.getAllCrops();
  }

  onCropAdded(element: Crop) {
    this.cropData = element;
    this.createCrop();
    this.resetEditState();
  }

  onCropUpdated(element: Crop) {
    this.cropData = element;
    this.updateCrop();
    this.resetEditState();
  }

  // Lifecycle Hooks

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllCrops();
  }
}
