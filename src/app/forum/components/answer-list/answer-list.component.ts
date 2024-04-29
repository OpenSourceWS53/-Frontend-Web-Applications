import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {AnswersService} from "../../services/answers.service";
import {MatButton} from "@angular/material/button";
import {MatButtonModule} from '@angular/material/button';
import {DialogAddAnswerComponent} from "../dialog-add-answer/dialog-add-answer.component";
import {MatDialog} from "@angular/material/dialog";
import {Answer} from "../../model/answer.entity";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-answer-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatButton, MatButtonModule, RouterLink],
  templateUrl: './answer-list.component.html',
  styleUrl: './answer-list.component.css'
})
export class AnswerListComponent implements  AfterViewInit, OnInit {
  displayedColumns: string[] = ['content'];
  answerData: Answer;
  dataSource!: MatTableDataSource<any>;
  @Input() row: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isEditMode: boolean;

  constructor(private answerService: AnswersService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<any>;
    this.answerData = {} as Answer;
    this.isEditMode = false;
  }

  private getAnswersByQuestionId() {
    this.answerService.getByIdParam('questionId', this.row.id).subscribe((response: any) => {
      console.log(response);
      this.dataSource.data = response;
    });
  };

  ngOnInit() {
    this.getAnswersByQuestionId();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  dialogNewAnswer() {
    this.dialog.open(DialogAddAnswerComponent,{
      disableClose: true,
      width: '400px',
      data: { row: this.row }
    }).afterClosed().subscribe(result =>{
      if(result==="created"){
        this.getAnswersByQuestionId();
      }
    });
  }
}
