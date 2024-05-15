import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {CropsService} from "../../services/crops.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatTableModule} from '@angular/material/table';
import {Crop} from "../../model/crop.entity";

@Component({
  selector: 'app-crop-general-information',
  standalone: true,
  imports: [MatGridListModule,MatCardModule, MatButtonModule,MatListModule, MatDividerModule,MatTableModule],
  templateUrl: './crop-general-information.component.html',
  styleUrl: './crop-general-information.component.css'
})
export class CropGeneralInformationComponent {
  displayedColumns: string[] = ['name', 'date', 'area'];
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
