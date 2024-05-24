import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {CommonModule} from '@angular/common';
import { Sowing } from "../../model/sowing.entity";
import { SowingsService } from "../../services/sowings.service";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-crops-history',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatCardModule, CommonModule, MatIconModule],
  templateUrl: './crops-history.component.html',
  styleUrl: './crops-history.component.css'
})
export class CropsHistoryComponent {
  sowings: Array<Sowing> = [];
  displayedColumns: string[] = ['name', 'status','actions'];
  dataSource: any;

  constructor(private sowingsService: SowingsService) {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.sowingsService.getAll().subscribe((data: any) => {
      this.sowings = data.map((sowing: any) => {
        return {
          name: sowing.crop_name,
          status: sowing.status
        };
      });
      this.dataSource = new MatTableDataSource(this.sowings);
    });
  }
}
