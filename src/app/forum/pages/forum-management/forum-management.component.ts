import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialog} from "@angular/material/dialog";
import {  DialogAddEditQuestionComponent } from "../../components/dialog-add-edit-question/dialog-add-edit-question.component";
import {
  CommunityQuestionListComponent
} from "../../components/community-question-list/community-question-list.component";
import {UserQuestionListComponent} from "../../components/user-question-list/user-question-list.component";


@Component({
  selector: 'app-forum-management',
  standalone: true,
  imports: [MatButton,
    MatTabsModule, CommunityQuestionListComponent, UserQuestionListComponent],
  templateUrl: './forum-management.component.html',
  styleUrl: './forum-management.component.css'
})
export class ForumManagementComponent {
  constructor(public dialog: MatDialog) {
  }
  dialogNewQuestion(){
    this.dialog.open(DialogAddEditQuestionComponent,{
      disableClose: true,
      width: '500px',
    }).afterClosed().subscribe(result =>{
      if(result){

      }
    });
  }
}
