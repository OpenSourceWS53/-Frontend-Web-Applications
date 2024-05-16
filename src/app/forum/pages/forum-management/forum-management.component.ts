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


@Component({
  selector: 'app-forum-management',
  standalone: true,
  imports: [MatButton,
    MatTabsModule, CommunityQuestionListComponent, UserQuestionListComponent],
  templateUrl: './forum-management.component.html',
  styleUrl: './forum-management.component.css'
})
export class ForumManagementComponent {
  @Output() questionCreated = new EventEmitter<Question>();
  constructor(public dialog: MatDialog) {
  }

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
        this.questionCreated.emit(result);
      }

    });
  }

  // UI Event Handlers
  showCreateForm() {
    this.openDialog();
  }
}
