import { Component , Input, OnInit} from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {SowingsService} from "../../services/sowings.service";
import {CropsService} from "../../services/crops.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatTableModule} from '@angular/material/table';
import {Sowing} from "../../model/sowing.entity";
import {Crop} from "../../model/crop.entity";
import { map, switchMap } from 'rxjs/operators';


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
  crop: Crop;

  constructor(private sowingsService: SowingsService, private cropsService: CropsService) {
    this.dataSource = new MatTableDataSource<any>;
    this.data = new Sowing();
    this.crop = new Crop();
  }
 private getSowingInformation() {
   this.sowingsService.getAll().pipe(
     map((sowings: any) => {
       const sowingArray: Sowing[] = sowings;
       const foundSowing = sowingArray.find((sowing: Sowing) => sowing.id === this.sowingId);
       if (!foundSowing) {
         throw new Error('Sowing not found');
       }
       return foundSowing;
     }),
     switchMap((sowing: Sowing) => {
       this.data = sowing;
       return this.cropsService.getById(sowing.cropId);
     })
   ).subscribe((crop: Crop) => {
     this.crop = crop;
     this.dataSource.data = [this.data];
   });
 }

  ngOnInit() {
    this.getSowingInformation();
  }
}
