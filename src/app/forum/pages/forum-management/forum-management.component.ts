import {Component, OnInit} from '@angular/core';
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
import {DialogDeleteQuestionComponent} from "../../components/dialog-delete-question/dialog-delete-question.component";
import {CategoryService} from "../../services/category.service";
import {Category} from "../../model/category.entity";
import {forkJoin} from "rxjs";
import {ProfilesForumService} from "../../services/profiles-forum.service";
import {ProfileForum} from "../../model/profile-forum.entity";




@Component({
  selector: 'app-forum-management',
  standalone: true,
  imports: [MatButton,
    MatTabsModule, CommunityQuestionListComponent, UserQuestionListComponent],
  templateUrl: './forum-management.component.html',
  styleUrl: './forum-management.component.css'
})
export class ForumManagementComponent implements OnInit {

  questionData: Question;
  isEditMode: boolean;
  dataSource!: MatTableDataSource<any>;
  dataSourceCommunity!: MatTableDataSource<any>;
  categories: Array<Category> = [];
  profiles: Array<ProfileForum>=[];
  constructor(private questionsService: QuestionsService,private categoriesService: CategoryService, private profilesService: ProfilesForumService ,public dialog: MatDialog) {
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
  private buildData(data: any){
      return data.map((question: any) => {
        return {
          ...question,
          ask: question.questionText,
          category: this.categories.find((category: Category) => category.id === question.categoryId)?.name,
          userName: this.profiles.find((profile: ProfileForum) => profile.id === question.userId)?.fullName
        }
      });
  }
  private buildItemData(data:any){
    // Encuentra la categoría correspondiente
    const category = this.categories.find((category: Category) => category.id === data.categoryId);
    const profile = this.profiles.find((profile: ProfileForum) => profile.id === data.userId);
    // Agrega las propiedades 'category' y 'ask' al objeto de respuesta
    data.category = category?.name;
    data.ask = data.questionText;
    data.userName = profile?.fullName;
    return data;
  }
  private getAllQuestions() {
    forkJoin({
      questions: this.questionsService.getAll(),
      categories: this.categoriesService.getAll(),
      profiles: this.profilesService.getAll()
    }).subscribe(({questions, categories, profiles}) => {
      this.categories = categories;
      this.profiles = profiles;
      this.dataSourceCommunity.data = this.buildData(questions);
      console.log(profiles)
      console.log(this.dataSourceCommunity.data);
    });
  };

  private getQuestionById() {
    forkJoin({
      questions: this.questionsService.getAll(),
      categories: this.categoriesService.getAll(),
      profiles: this.profilesService.getAll()
    }).subscribe(({questions, categories, profiles}) => {
      this.categories = categories;
      this.dataSource.data = this.buildData(questions);
      this.profiles = profiles;
      console.log(this.dataSource.data);
    });
    // this.questionsService.getAll().subscribe((response: any) => {
    //   this.dataSource.data = response;
    // });
  }

  private createQuestion() {
    this.questionsService.create(this.questionData).subscribe((response: any) => {
      console.log(response);
      let updatedData = this.buildItemData(response);
      this.dataSource.data.push({...updatedData});
      this.dataSource.data = this.dataSource.data.map((question: Question) => { return question; });
      this.dataSourceCommunity.data.push({...updatedData});
      this.dataSourceCommunity.data = this.dataSourceCommunity.data.map((question: Question) => { return question; });
      /*const updatedCommunityData = [...this.dataSourceCommunity.data, response];
      this.dataSourceCommunity.data = updatedCommunityData;

      const updatedUserData = [...this.dataSource.data, response];
      this.dataSource.data = updatedUserData;*/
    });
  };

  private updateQuestion() {
    let questionToUpdate = this.questionData;
    this.questionsService.update(this.questionData.id, questionToUpdate).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((question: Question) => {
        if (question.id === response.id) {
          let updatedData = this.buildItemData(response);
          return updatedData;
        }
        return question;
      });
      this.dataSourceCommunity.data = this.dataSourceCommunity.data.map((question: Question) => {
        if (question.id === response.id) {
          let updatedData = this.buildItemData(response);
          return updatedData;
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
      this.onCancelEdit();
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
    this.openDialog(element);
  }

  onDeleteItem(element: Question) {
    const dialogRef = this.dialog.open(DialogDeleteQuestionComponent);

    dialogRef.afterClosed().subscribe((result)=>{
      if(result){
        console.log(element);
        this.deleteQuestion(element.id);
      }
    })
  }

  onCancelEdit() {
    this.resetEditState();
    this.getAllQuestions();
  }

  onQuestionAdded(element: Question) {
    this.questionData = element;
    this.questionData.userId = 1;
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
