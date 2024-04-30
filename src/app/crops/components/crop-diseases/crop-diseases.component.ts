import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {DiseasesService} from "../../services/diseases.service";



@Component({
  selector: 'app-crop-diseases',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './crop-diseases.component.html',
  styleUrl: './crop-diseases.component.css'
})
export class CropDiseasesComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['name', 'description', 'solution'];
  dataSource!: MatTableDataSource<any>;

  constructor(private diseasesService:DiseasesService) {
    this.dataSource = new MatTableDataSource<any>;
  }

  private getAllDiseases() {
    this.diseasesService.getAll().subscribe((response: any) =>{
      console.log(response);
      this.dataSource.data=response;
    });
  }

  ngOnInit() {
    this.getAllDiseases();
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
