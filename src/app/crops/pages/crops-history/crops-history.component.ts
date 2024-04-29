import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import {Crop} from "../../model/crop.entity";
import {CropsService} from "../../services/crops.service";
@Component({
  selector: 'app-crops-history',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatCardModule],
  templateUrl: './crops-history.component.html',
  styleUrl: './crops-history.component.css'
})
export class CropsHistoryComponent {
  crops: Array<Crop> = [];
  displayedColumns: string[] = ['name', 'plantedDate', 'harvestDate', 'phenologicalPhase'];
  dataSource: any;

  constructor(private cropsService: CropsService) {
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
    ngOnInit(): void {
      this.cropsService.getAll().subscribe((data: any) => {
        this.crops = data;
        this.dataSource = new MatTableDataSource(this.crops);
      });
    }
}
