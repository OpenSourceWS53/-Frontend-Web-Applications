import { Component } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatGridList, MatGridListModule, MatGridTile} from '@angular/material/grid-list';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {Crop} from "../../model/crop.entity";
import {CropsService} from "../../services/crops.service";


@Component({
  selector: 'app-crop-cares',
  standalone: true,
  imports: [MatCardModule, MatDatepickerModule, MatGridList, MatGridTile,MatTableModule],
  templateUrl: './crop-cares.component.html',
  styleUrl: './crop-cares.component.css',
  providers: [provideNativeDateAdapter()],
})
export class CropCaresComponent {
  selected: Date | null = null;
  displayedColumns: string[] = ['date', 'suggestion'];
  dataSource!: MatTableDataSource<any>;
  data: Crop;

  constructor(private cropsService: CropsService) {
    this.dataSource = new MatTableDataSource<any>;
    this.data = new Crop();
  }
  private getCropInformation() {
    this.cropsService.getByIdParam('id',1).subscribe((response: any) =>{
      this.data=response[0];
      this.dataSource.data=response;
      console.log(this.data);
    });
  }
  ngOnInit() {
    this.getCropInformation();
  }
}
