import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgClass, NgIf} from "@angular/common";
import {Question} from "../../model/question.entity";
import {QuestionsService} from "../../services/questions.service";
import {MatButtonModule} from '@angular/material/button';
import {AnswerListComponent} from "../answer-list/answer-list.component";
import {DialogAddEditQuestionComponent} from "../dialog-add-edit-question/dialog-add-edit-question.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogDeleteQuestionComponent} from "../dialog-delete-question/dialog-delete-question.component";


@Component({
  selector: 'app-user-question-list',
  standalone: true,
  imports: [MatPaginator, MatSort, MatIconModule, MatTableModule, NgClass, MatFormFieldModule, MatInputModule, MatButtonModule, NgIf, AnswerListComponent],
  templateUrl: './user-question-list.component.html',
  styleUrl: './user-question-list.component.css'
})
export class UserQuestionListComponent implements AfterViewInit, OnInit {

  // Attributes

  @Input() isEditMode = false;
  @Input() dataSource!: MatTableDataSource<any>;
  questionData: Question;
  @Output() questionAdded = new EventEmitter<Question>();
  @Output() questionUpdated = new EventEmitter<Question>();
  @Output() questionDeleted = new EventEmitter<Question>();
  @Output() editCanceled = new EventEmitter();
  @Output() editItem = new EventEmitter<Question>();
  @Output() getQuestions = new EventEmitter();

  displayedColumns: string[] = ['Ask', 'Category', 'Date', 'Actions'];
  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;

  isQuestionSelect: boolean;
  selectedQuestion: Question;

  // Constructor
  constructor(private questionsService: QuestionsService,private dialog: MatDialog) {
    this.isQuestionSelect = false;
    this.selectedQuestion = {} as Question;
    this.questionData = {} as Question;
  }


  openDialog(question?: Question): void {
    const dialogRef = this.dialog.open(DialogAddEditQuestionComponent, {
      width: '500px',
      data: {
        question: question || null,
        isEditMode: this.isEditMode
      }
    });

    dialogRef.afterClosed().subscribe((result: Question) => {
      if (result) {
        if (this.isEditMode) {
          this.questionUpdated.emit(result);
        } else {
          this.questionAdded.emit(result);
        }
      } else {
        this.editCanceled.emit();
      }
      this.getQuestions.emit();
    });
  }

  onEditItem(element: Question) {
    this.isEditMode = true;
    this.questionData = element;
    this.openDialog(element);
  }

  onDeleteItem(element: Question) {
    const dialogRef = this.dialog.open(DialogDeleteQuestionComponent);

    dialogRef.afterClosed().subscribe((result)=>{
      if(result){
        this.questionDeleted.emit(element);
      }
    })

  }
  // UI Event Handlers


  onRowClicked(element: Question) {
    this.selectedQuestion = element;
    this.isQuestionSelect = true;
  }

  questionSelected(){
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
