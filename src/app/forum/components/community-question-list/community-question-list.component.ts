import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {DatePipe, NgClass, NgIf} from "@angular/common";
import {Question} from "../../model/question.entity";
import {QuestionsService} from "../../services/questions.service";
import {MatButtonModule} from '@angular/material/button';
import {AnswerListComponent} from "../answer-list/answer-list.component";


@Component({
  selector: 'app-community-question-list',
  standalone: true,
  imports: [MatPaginator, MatSort, MatIconModule, MatTableModule, NgClass, MatFormFieldModule, MatInputModule, MatButtonModule, NgIf, AnswerListComponent, DatePipe],
  templateUrl: './community-question-list.component.html',
  styleUrl: './community-question-list.component.css'
})
export class CommunityQuestionListComponent implements AfterViewInit, OnInit {
  // Attributes
  questionData: Question;
  @Input() dataSource!: MatTableDataSource<any>;
  @Output() getQuestions = new EventEmitter();
  selectedQuestion: Question;
  displayedColumns: string[] = ['Ask', 'Category', 'Date', 'User'];
  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;
  isQuestionSelect: boolean;

  // Constructor
  constructor() {
    this.isQuestionSelect = false;
    this.questionData = {} as Question;
    this.selectedQuestion = {} as Question;
  }


  onRowClicked(element: Question) {
    this.selectedQuestion = element;
    this.isQuestionSelect = true;
  }

  returnQuestionsTable(){
    this.isQuestionSelect = false;
  }

  // Lifecycle Hooks

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {  }
}
