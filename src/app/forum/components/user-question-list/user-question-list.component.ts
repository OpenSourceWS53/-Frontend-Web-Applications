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
import {MatDialog} from "@angular/material/dialog";
import {DialogDeleteQuestionComponent} from "../dialog-delete-question/dialog-delete-question.component";
import {DialogAddEditQuestionComponent} from "../dialog-add-edit-question/dialog-add-edit-question.component";

@Component({
  selector: 'app-user-question-list',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatButton, MatIconModule, NgIf, NgForOf, AnswerListComponent],
  templateUrl: './user-question-list.component.html',
  styleUrl: './user-question-list.component.css'
})
export class UserQuestionListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['ask', 'category', 'date','actions'];
  dataSource!: MatTableDataSource<any>;
  selectedRow: any = null;
  constructor(private questionService: QuestionsService,public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<any>;
    this.selectedRow = false;
  }

  private getAllQuestions() {
    this.questionService.getByIdParam('id',10).subscribe((response: any) =>{
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

  dialogEditQuestion(dataQuestion: Question) {
    this.dialog.open(DialogAddEditQuestionComponent,{
      disableClose: true,
      width: '400px',
      data: dataQuestion
    }).afterClosed().subscribe(result =>{
      if(result){
        this.getAllQuestions();
      }
    });
  }
  dialogDeleteQuestion(dataQuestion: Question){
    this.dialog.open(DialogDeleteQuestionComponent,{
      disableClose: true,
      data: dataQuestion
    }).afterClosed().subscribe(result =>{
      if(result){
        this.getAllQuestions();
      }
    });
  }

  clickedRow = new Set<Question>();
}
