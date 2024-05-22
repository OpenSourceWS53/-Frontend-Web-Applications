import { Component, Output, EventEmitter } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialog} from "@angular/material/dialog";
import {  DialogAddEditQuestionComponent } from "../../components/dialog-add-edit-question/dialog-add-edit-question.component";
import {
  CommunityQuestionListComponent
} from "../../components/community-question-list/community-question-list.component";
import {UserQuestionListComponent} from "../../components/user-question-list/user-question-list.component";
import {Question} from "../../model/question.entity";
import {QuestionsService} from "../../services/questions.service";
import {MatTableDataSource} from "@angular/material/table";


@Component({
  selector: 'app-forum-management',
  standalone: true,
  imports: [MatButton,
    MatTabsModule, CommunityQuestionListComponent, UserQuestionListComponent],
  templateUrl: './forum-management.component.html',
  styleUrl: './forum-management.component.css'
})
export class ForumManagementComponent {

  questionData: Question;
  isEditMode: boolean;
  dataSource!: MatTableDataSource<any>;
  dataSourceCommunity!: MatTableDataSource<any>;
  constructor(private questionsService: QuestionsService,public dialog: MatDialog) {
    this.isEditMode = false;
    this.questionData = {} as Question;
    this.dataSource = new MatTableDataSource<any>();
    this.dataSourceCommunity = new MatTableDataSource<any>();
  }

  // Private Methods
  private resetEditState(): void {
    this.isEditMode = false;
    this.questionData = {} as Question;
  }

  // CRUD Actions

  private getAllQuestions() {
    this.questionsService.getAll().subscribe((response: any) => {
      this.dataSourceCommunity.data = response;
    });
  };

  private getQuestionById() {
    this.questionsService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  private createQuestion() {
    this.questionsService.create(this.questionData).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((question: Question) => { return question; });
      this.dataSourceCommunity.data.push({...response});
      this.dataSourceCommunity.data = this.dataSourceCommunity.data.map((question: Question) => { return question; });
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
      this.dataSourceCommunity.data = this.dataSourceCommunity.data.map((question: Question) => {
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
      this.dataSourceCommunity.data = this.dataSourceCommunity.data.filter((question: Question) => {
        return question.id !== questionId ? question : false;
      });
    });
  };


  openDialog(question?: Question): void {
    const dialogRef = this.dialog.open(DialogAddEditQuestionComponent, {
      width: '500px',
      data: {
        question: question || null,
        isEditMode: false
      }
    });

    dialogRef.afterClosed().subscribe((result: Question) => {
      if (result) {
        if (this.isEditMode) {
          this.onQuestionUpdated(result);
        } else {
          this.onQuestionAdded(result);
        }
      }
      this.getAllQuestions();
    });
  }

  // UI Event Handlers
  showCreateForm() {
    this.openDialog();
  }

  onGetAllQuestionsCommunity() {
    this.getAllQuestions();
  }
  onGetAllQuestions() {
    this.getQuestionById();
  }
  onEditItem(element: Question) {
    this.isEditMode = true;
    this.questionData = element;
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

  ngOnInit(): void {
    this.getAllQuestions();
    this.getQuestionById();
  }
}
