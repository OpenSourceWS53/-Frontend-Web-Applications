import {AfterViewInit, Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
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
import {ForumManagementComponent} from "../../pages/forum-management/forum-management.component";


@Component({
  selector: 'app-user-question-list',
  standalone: true,
  imports: [MatPaginator, MatSort, MatIconModule, MatTableModule, NgClass, MatFormFieldModule, MatInputModule, MatButtonModule, NgIf, AnswerListComponent],
  templateUrl: './user-question-list.component.html',
  styleUrl: './user-question-list.component.css'
})
export class UserQuestionListComponent implements AfterViewInit, OnInit {

  // Attributes
  questionData: Question;
  selectedQuestion: Question;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['Ask', 'Category', 'Date', 'Actions'];
  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;
  isEditMode: boolean;
  isQuestionSelect: boolean;

  // Constructor
  constructor(private questionsService: QuestionsService,private dialog: MatDialog,private forumManagement: ForumManagementComponent) {
    this.isEditMode = false;
    this.isQuestionSelect = false;
    this.questionData = {} as Question;
    this.selectedQuestion = {} as Question;
    this.dataSource = new MatTableDataSource<any>();
  }

  // Private Methods
  private resetEditState(): void {
    this.isEditMode = false;
    this.questionData = {} as Question;
  }

  // CRUD Actions

  private getAllQuestions() {
    this.questionsService.getByIdParam('id',10).subscribe((response: any) => {
      this.dataSource.data = response;
    });
  };

  private createQuestion() {
    this.questionsService.create(this.questionData).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((question: Question) => { return question; });
    });
  };

  private updateQuestion() {
    let questionToUpdate = this.questionData;
    this.questionsService.update(this.questionData.id, questionToUpdate).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((question: Question) => {
        if (question.id === response.id) {
          return response;
        }
        return question;
      });
    });
  };

  private deleteQuestion(questionId: number) {
    this.questionsService.delete(questionId).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((question: Question) => {
        return question.id !== questionId ? question : false;
      });
    });
  };

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
          this.onQuestionUpdated(result);
        } else {
          this.onQuestionAdded(result);
        }
      } else {
        this.onCancelEdit();
      }
      this.getAllQuestions();
    });
  }

  // UI Event Handlers
  showCreateForm() {
    this.openDialog();
  }

  onEditItem(element: Question) {
    this.isEditMode = true;
    this.questionData = element;
    this.openDialog(element);
  }

  onDeleteItem(element: Question) {
    this.deleteQuestion(element.id);
  }

  onCancelEdit() {
    this.resetEditState();
    this.getAllQuestions();
  }

  onQuestionAdded(element: Question) {
    this.questionData = element;
    this.questionData.id = 11;
    this.questionData.date = new Date();
    console.log(this.questionData);
    this.createQuestion();
    this.resetEditState();
  }

  onQuestionUpdated(element: Question) {
    this.questionData = element;
    this.updateQuestion();
    this.resetEditState();
  }

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



  ngOnInit(): void {
    this.getAllQuestions();

    this.forumManagement.questionCreated.subscribe((question: Question) => {
      this.onQuestionAdded(question);
    });
  }
}
