import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { NgClass } from "@angular/common";
import { Router } from '@angular/router'; // Import Router

import { SowingsService } from "../../services/sowings.service";
import { Sowing } from "../../model/sowing.entity";
import { SowingsCreateAndEditComponent, SowingRequest } from "../../components/sowings-create-and-edit/sowings-create-and-edit.component";
import { DateRange, PhenologicalPhase } from "../../model/sowing.entity";
import { CropsService } from "../../services/crops.service";
import { mergeMap, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-sowings-management',
  standalone: true,
  imports: [CommonModule,MatPaginator, MatSort, MatIconModule, SowingsCreateAndEditComponent, MatTableModule, NgClass],
  templateUrl: './sowings-management.component.html',
  styleUrl: './sowings-management.component.css'
})
export class SowingsManagementComponent implements OnInit, AfterViewInit {
  sowingData: Sowing;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['cropName', 'startDate', 'harvestDate', 'areaLand', 'phenologicalPhase', 'actions'];
  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;
  isEditMode: boolean;

  constructor(private sowingService: SowingsService, private cropsService: CropsService, private router: Router) {
    this.isEditMode = false;
    this.sowingData = {} as Sowing;
    this.dataSource = new MatTableDataSource<any>();
  }

  private resetEditState(): void {
    this.isEditMode = false;
    this.sowingData = {} as Sowing;
  }

  private getAllSowings() {
    this.sowingService.getAll().pipe(
      mergeMap((sowings: Sowing[]) => {
        const sowingObservables = sowings.map((sowing: Sowing) => {
          return this.cropsService.getById(sowing.cropId).pipe(
            map((crop: any) => {
                        console.log(crop); // Log the crop object
              return { ...sowing, cropName: crop.name };
            })
          );
        });
        return forkJoin(sowingObservables);
      })
    ).subscribe((sowingsWithCropName: any[]) => {
      console.log(sowingsWithCropName);
      this.dataSource.data = sowingsWithCropName;
    });
  }

  private createSowing() {
    this.sowingService.create(this.sowingData).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((sowing: Sowing) => { return sowing; });
    });
  };

  private updateSowing() {
    let sowingToUpdate = this.sowingData;
    this.sowingService.update(this.sowingData.id, sowingToUpdate).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((sowing: Sowing) => {
        if (sowing.id === response.id) {
          return response;
        }
        return sowing;
      });
    });
  };
  getPhenologicalPhaseName(phase: PhenologicalPhase): string {
            switch(phase) {
              case PhenologicalPhase.GERMINATION:
                return 'Germination';
              case PhenologicalPhase.SEEDLING:
                return 'Seedling';
              case PhenologicalPhase.VEGETATIVE_GROWTH:
                return 'Vegetative Growth';
              case PhenologicalPhase.FLOWERING:
                return 'Flowering';
              case PhenologicalPhase.HARVEST_READY:
                return 'Harvest Ready';
              default:
                return 'Unknown';
            }
          }
  private deleteSowing(sowingId: number) {
    this.sowingService.delete(sowingId).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((sowing: Sowing) => {
        return sowing.id !== sowingId ? sowing : false;
      });
    });
  };

  onEditItem(element: Sowing) {
    this.isEditMode = true;
    this.sowingData = element;
  }

  onDeleteItem(element: Sowing) {
    this.deleteSowing(element.id);
  }

  onCancelEdit() {
    this.resetEditState();
    this.getAllSowings();
  }

  onSowingAdded(element: SowingRequest) {
    this.sowingData = {...element, id: 0, dateRange: new DateRange(), profileId: 0, status: false, phenologicalPhase: PhenologicalPhase.GERMINATION};
    this.createSowing();
    this.resetEditState();
  }

  onSowingUpdated(element: SowingRequest) {
    this.sowingData = {...element, id: this.sowingData.id, dateRange: this.sowingData.dateRange, profileId: this.sowingData.profileId, status: this.sowingData.status, phenologicalPhase: this.sowingData.phenologicalPhase};
    this.updateSowing();
    this.resetEditState();
  }
  onViewInfo(element: Sowing) {
    this.router.navigate(['/info', element.id], { state: { sowingId: element.id } });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllSowings();
  }
}
