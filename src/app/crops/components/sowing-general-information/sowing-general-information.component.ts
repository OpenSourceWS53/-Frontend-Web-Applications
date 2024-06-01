import { Component , Input, OnInit} from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {SowingsService} from "../../services/sowings.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatTableModule} from '@angular/material/table';
import {Sowing} from "../../model/sowing.entity";
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-sowing-general-information',
  standalone: true,
  imports: [MatGridListModule,MatCardModule, MatButtonModule,MatListModule, MatDividerModule,MatTableModule],
  templateUrl: './sowing-general-information.component.html',
  styleUrl: './sowing-general-information.component.css'
})
export class SowingGeneralInformationComponent implements OnInit{
  @Input() sowingId!: number;
  displayedColumns: string[] = ['name', 'date', 'area'];
  dataSource!: MatTableDataSource<any>;
  data: Sowing;

  constructor(private sowingsService: SowingsService) {
    this.dataSource = new MatTableDataSource<any>;
    this.data = new Sowing();
  }
  private getSowingInformation() {
      this.sowingsService.getAll().pipe(
        map((sowings: any) => {
          const sowingArray: Sowing[] = sowings;
          return sowingArray.find((sowing: Sowing) => sowing.id === this.sowingId);
        })
      ).subscribe((response: any) => {
        this.data = response;
        this.dataSource.data = [response];
      });
    }

  ngOnInit() {
    this.getSowingInformation();
  }
}
