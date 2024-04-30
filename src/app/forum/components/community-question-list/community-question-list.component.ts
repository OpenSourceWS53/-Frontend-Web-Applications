import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {QuestionsService} from "../../services/questions.service";
import {MatButton} from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
import {NgForOf, NgIf} from "@angular/common";
import {Question} from "../../model/question.entity";
import {AnswerListComponent} from "../answer-list/answer-list.component";

@Component({
  selector: 'app-community-question-list',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatButton, MatIconModule, NgIf, NgForOf, AnswerListComponent],
  templateUrl: './community-question-list.component.html',
  styleUrl: './community-question-list.component.css'
})
export class CommunityQuestionListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['ask', 'category', 'userName', 'date'];
  dataSource!: MatTableDataSource<any>;
  selectedRow: any = null;

  constructor(private questionService: QuestionsService) {
    this.dataSource = new MatTableDataSource<any>;
    this.selectedRow = false;
  }

  private getAllQuestions() {
    this.questionService.getAll().subscribe((response: any) =>{
      console.log(response);
      this.dataSource.data=response;
    });
  }

  ngOnInit() {
    this.getAllQuestions();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  clickedRow = new Set<Question>();
}
