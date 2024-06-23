import { Component, OnInit, Input } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatGridList, MatGridListModule, MatGridTile} from '@angular/material/grid-list';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {CaresService} from "../../services/cares.service";
import {SowingsService} from "../../services/sowings.service";
import {CropsService} from "../../services/crops.service";
import { Care } from "../../model/care.entity";
import { Sowing } from "../../model/sowing.entity";
import { Crop } from "../../model/crop.entity";
import { map, switchMap } from 'rxjs/operators';

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
  displayedColumns: string[] = ['careDate', 'description'];
  dataSource!: MatTableDataSource<any>;

  constructor(private caresService: CaresService, private sowingsService: SowingsService, private cropsService: CropsService) {
    this.dataSource = new MatTableDataSource<any>;
  }

 private getCaresInformation() {
   this.sowingsService.getById(this.sowingId).pipe(
     switchMap((sowing: Sowing) => this.cropsService.getById(sowing.cropId)),
     map((crop: Crop) => {
       console.log('Crop data:', crop); // Log the crop object with a more calm message
       return crop;
     }),
     switchMap((crop: Crop) => {
       return this.caresService.getAll().pipe(
         map((cares: Care[]) => cares.filter(care => crop.cares.includes(care.id)))
       );
     })
   ).subscribe((filteredCares: Care[]) => {
     this.dataSource.data = filteredCares;
   });
 }

  ngOnInit() {
    this.getCaresInformation();
  }
}
