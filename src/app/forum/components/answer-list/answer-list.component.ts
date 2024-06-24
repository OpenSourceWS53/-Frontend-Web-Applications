import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgClass, NgIf} from "@angular/common";
import {MatButtonModule} from '@angular/material/button';
import {AnswersService} from "../../services/answers.service";
import {MatDialog} from "@angular/material/dialog";
import {Answer} from "../../model/answer.entity";
import {DialogAddAnswerComponent} from "../dialog-add-answer/dialog-add-answer.component";






@Component({
  selector: 'app-answer-list',
  standalone: true,
  imports: [MatPaginator, MatSort, MatIconModule, MatTableModule, NgClass, MatFormFieldModule, MatInputModule, MatButtonModule, NgIf],
  templateUrl: './answer-list.component.html',
  styleUrl: './answer-list.component.css'
})
export class AnswerListComponent implements  AfterViewInit, OnInit {
  @Input() question: any;
  @Input() isCommunityAnswers: any;

  answerData: Answer;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['content'];
  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;
  isEditMode: boolean;

  // Constructor
  constructor(private answersService: AnswersService,private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<any>();
    this.answerData = {} as Answer;
    this.isEditMode = false;
  }

  // Private Methods
  private resetEditState(): void {
    this.isEditMode = false;
    this.answerData = {} as Answer;
  }

  // CRUD Actions

  private getAnswersByQuestionId() {
    this.answersService.getByQuestionId( this.question.id).subscribe((response: any) => {
      this.dataSource.data = response;
      console.log(this.dataSource.data);
    });
  };

  private createAnswer() {
    this.answersService.create(this.answerData).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((answer: Answer) => { return answer; });
    });
  };

  private updateAnswer() {
    let answerToUpdate = this.answerData;
    this.answersService.update(this.answerData.id, answerToUpdate).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((answer: Answer) => {
        if (answer.id === response.id) {
          return response;
        }
        return answer;
      });
    });
  };

  private deleteAnswer(answerId: number) {
    this.answersService.delete(answerId).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((answer: Answer) => {
        return answer.id !== answerId ? answer : false;
      });
    });
  };

  openDialog(answer?: Answer): void {
    const dialogRef = this.dialog.open(DialogAddAnswerComponent, {
      width: '450px',
      data: {
        answer: answer || null,
        isEditMode: this.isEditMode
      }
    });

    dialogRef.afterClosed().subscribe((result: Answer) => {
      if (result) {
        if (this.isEditMode) {
          this.onAnswerUpdated(result);
        } else {
          this.onAnswerAdded(result);
        }
      } else {
        this.onCancelEdit();
      }
      this.getAnswersByQuestionId();
    });
  }

  // UI Event Handlers
  showCreateForm() {
    this.openDialog();
  }

  onEditItem(element: Answer) {
    this.isEditMode = true;
    this.answerData = element;
    this.openDialog(element);
  }

  onDeleteItem(element: Answer) {
    this.deleteAnswer(element.id);
  }

  onCancelEdit() {
    this.resetEditState();
    this.getAnswersByQuestionId();
  }

  onAnswerAdded(element: Answer) {
    this.answerData = element;
    this.answerData.questionId = this.question.id;
    this.answerData.userId = 1;
    console.log(this.answerData);
    this.createAnswer();
    this.resetEditState();
  }

  onAnswerUpdated(element: Answer) {
    this.answerData = element;
    this.updateAnswer();
    this.resetEditState();
  }

  // Lifecycle Hooks

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAnswersByQuestionId();
  }
}
