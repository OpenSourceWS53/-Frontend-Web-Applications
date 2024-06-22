import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {CommonModule} from '@angular/common';
import { Sowing } from "../../model/sowing.entity";
import { SowingsService } from "../../services/sowings.service";
import { MatIconModule } from '@angular/material/icon';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-crops-history',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatCardModule, CommonModule, MatIconModule, MatPaginator],
  templateUrl: './crops-history.component.html',
  styleUrl: './crops-history.component.css'
})
export class CropsHistoryComponent implements AfterViewInit, OnInit{
  sowings: Array<Sowing> = [];
  displayedColumns: string[] = ['id','name', 'start_date', 'harvest_date', 'controls'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;
  constructor(private sowingsService: SowingsService) {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.sowingsService.getAll().subscribe((data: any) => {
      console.log(data);
      this.sowings = data.filter((sowing:any )=> sowing.status === "true").map((sowing: any) => {
        return {
          id: sowing.id,
          name: sowing.crop_name,
          start_date: sowing.start_date,
          harvest_date: sowing.harvest_date,
          controls: sowing.controls.length
        };
      });
      this.dataSource = new MatTableDataSource(this.sowings);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
