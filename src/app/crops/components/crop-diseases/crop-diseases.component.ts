import {AfterViewInit, Component, OnInit, ViewChild, Input} from '@angular/core'; // Import Input
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {DiseasesService} from "../../services/diseases.service";
import {SowingsService} from "../../services/sowings.service"; // Import SowingsService



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

  constructor(private diseasesService:DiseasesService, private sowingsService: SowingsService) {
    this.dataSource = new MatTableDataSource<any>;
  }

  private getAllDiseases() {
  this.sowingsService.getAll().subscribe((sowings: any) => {
    console.log('Received sowings:', sowings);
    const sowing = sowings.find((sowing: any) => sowing.id === this.sowingId);
    if (sowing) {
      const cropId = sowing.crop_id;
      this.diseasesService.getAll().subscribe((response: any) => {
        console.log('Received diseases:', response); // Log received diseases
        const filteredDiseases = response.filter((disease: any) => disease.crop_id === cropId);
        this.dataSource = new MatTableDataSource<any>(filteredDiseases);
        this.dataSource.paginator = this.paginator;
      });
    }
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
