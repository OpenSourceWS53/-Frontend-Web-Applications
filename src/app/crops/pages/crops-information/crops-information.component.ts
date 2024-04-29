import { Component } from '@angular/core';

import {MatTabsModule} from '@angular/material/tabs';

import {provideNativeDateAdapter} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import {Care} from "../../model/care.entity";
import {SuggestionsService} from "../../services/suggestions.service";

@Component({
  selector: 'app-crops-information',
  standalone: true,
  imports: [MatTabsModule, MatCardModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatTableModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './crops-information.component.html',
  styleUrl: './crops-information.component.css'
})
export class CropsInformationComponent {

  selected: Date | null;

  care: Array<Care> = [];
    displayedColumns: string[] = ['date', 'suggestion'];
    dataSource: any;

  constructor(private suggestionsService: SuggestionsService) {
  this.selected = null;
  }
  ngOnInit(): void {
    this.suggestionsService.getAll().subscribe((data: any) => {
      this.care = data;
      this.dataSource = new MatTableDataSource(this.care);
    });
    }
}
