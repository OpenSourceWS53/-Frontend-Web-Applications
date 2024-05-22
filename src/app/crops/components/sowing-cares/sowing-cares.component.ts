import { Component, OnInit, Input } from '@angular/core'; // Import Input
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatGridList, MatGridListModule, MatGridTile} from '@angular/material/grid-list';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {CaresService} from "../../services/cares.service";
import { Care } from "../../model/care.entity";

@Component({
  selector: 'app-sowing-cares',
  standalone: true,
  imports: [MatCardModule, MatDatepickerModule, MatGridList, MatGridTile,MatTableModule],
  templateUrl: './sowing-cares.component.html',
  styleUrl: './sowing-cares.component.css',
  providers: [provideNativeDateAdapter()],
})
export class SowingCaresComponent implements OnInit {
  @Input() sowingId!: number;
  selected: Date | null = null;
  displayedColumns: string[] = ['date', 'suggestion'];
  dataSource!: MatTableDataSource<any>;

  careData: Care;

  constructor(private caresService: CaresService) {
    this.dataSource = new MatTableDataSource<any>;
    this.careData = {} as Care;
  }

  private getCaresInformation() {
      this.caresService.getAll().subscribe((response: any) => {
        console.log(response);
        this.dataSource.data = response.filter((care: any) => Number(care.sowing_id) === this.sowingId); // Use sowingId for filtering
      });
  }

  ngOnInit() {
    this.getCaresInformation();
  }
}
