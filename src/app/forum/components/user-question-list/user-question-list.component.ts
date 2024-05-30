import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {DatePipe, NgClass, NgIf} from "@angular/common";
import {Question} from "../../model/question.entity";
import {MatButtonModule} from '@angular/material/button';
import {AnswerListComponent} from "../answer-list/answer-list.component";

@Component({
  selector: 'app-user-question-list',
  standalone: true,
  imports: [MatPaginator, MatSort, MatIconModule, MatTableModule, NgClass, MatFormFieldModule, MatInputModule, MatButtonModule, NgIf, AnswerListComponent, DatePipe],
  templateUrl: './user-question-list.component.html',
  styleUrl: './user-question-list.component.css'
})
export class UserQuestionListComponent implements AfterViewInit, OnInit {

  // Attributes

  @Input() isEditMode = false;
  @Input() dataSource!: MatTableDataSource<any>;
  questionData: Question;

  @Output() onQuestionDeleted = new EventEmitter<Question>();
  @Output() onEditItem = new EventEmitter<Question>();
  @Output() getQuestions = new EventEmitter();

  displayedColumns: string[] = ['Ask', 'Category', 'Date', 'Actions'];
  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;

  isQuestionSelect: boolean;
  selectedQuestion: Question;

  // Constructor
  constructor() {
    this.isQuestionSelect = false;
    this.selectedQuestion = {} as Question;
    this.questionData = {} as Question;
  }


  // UI Event Handlers


  onRowClicked(element: Question) {
    this.selectedQuestion = element;
    this.isQuestionSelect = true;
  }

  returnQuestions(){
    this.isQuestionSelect = false;
    this.getQuestions.emit();
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {

  }
}
