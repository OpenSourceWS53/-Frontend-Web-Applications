import {AfterViewInit, Component, OnInit, ViewChild, Input} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {DiseasesService} from "../../services/diseases.service";
import {PestsService} from "../../services/pests.service";
import {SowingsService} from "../../services/sowings.service";
import { map, switchMap } from 'rxjs/operators';
import {CropsService} from "../../services/crops.service";

@Component({
  selector: 'app-crop-diseases',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './crop-diseases.component.html',
  styleUrl: './crop-diseases.component.css'
})
export class CropDiseasesComponent implements AfterViewInit, OnInit {
  @Input() sowingId!: number;
  displayedColumns: string[] = ['name', 'description', 'solution'];
  dataSource!: MatTableDataSource<any>;

  constructor(private diseasesService:DiseasesService, private pestsService: PestsService, private sowingsService: SowingsService, private cropsService: CropsService) {
    this.dataSource = new MatTableDataSource<any>;
  }

  private getAllDiseasesAndPests() {
  this.sowingsService.getById(this.sowingId).pipe(
    switchMap((sowing: any) => this.cropsService.getById(sowing.cropId)), // Use cropsService here
    map((crop: any) => {
      console.log('Crop data:', crop); // Log the crop object
      return crop;
    }),
    switchMap((crop: any) => {
      return this.diseasesService.getAll().pipe(
        map((diseases: any) => {
          return { diseases: diseases.filter((disease: any) => crop.diseases.includes(disease.id)), pestsIds: crop.pests };
        })
      );
    }),
    switchMap((data: any) => {
      return this.pestsService.getAll().pipe(
        map((pests: any) => {
          return [...data.diseases, ...pests.filter((pest: any) => data.pestsIds.includes(pest.id))];
        })
      );
    })
  ).subscribe((allData: any) => {
    this.dataSource = new MatTableDataSource<any>(allData);
    this.dataSource.paginator = this.paginator;
  });
}

  ngOnInit() {
    this.getAllDiseasesAndPests();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
