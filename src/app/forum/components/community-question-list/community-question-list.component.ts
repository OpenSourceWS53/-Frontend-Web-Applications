import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
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
import {ForumManagementComponent} from "../../pages/forum-management/forum-management.component";

@Component({
  selector: 'app-community-question-list',
  standalone: true,
  imports: [MatPaginator, MatSort, MatIconModule, MatTableModule, NgClass, MatFormFieldModule, MatInputModule, MatButtonModule, NgIf, AnswerListComponent],
  templateUrl: './community-question-list.component.html',
  styleUrl: './community-question-list.component.css'
})
export class CommunityQuestionListComponent implements AfterViewInit, OnInit {
  // Attributes
  questionData: Question;
  selectedQuestion: Question;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['Ask', 'Category', 'Date', 'User'];
  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;
  isQuestionSelect: boolean;
  isEditMode: boolean;

  // Constructor
  constructor(private questionsService: QuestionsService,private forumManagement: ForumManagementComponent) {
    this.isQuestionSelect = false;
    this.isEditMode = false;
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
  private createQuestion() {
    this.questionsService.create(this.questionData).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((question: Question) => { return question; });
    });
  };

  private getAllQuestions() {
    this.questionsService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  };


  onQuestionAdded(element: Question) {
    this.questionData = element;
    this.questionData.id = 11;
    this.questionData.date = new Date();
    this.createQuestion();
    this.resetEditState();
  }

  onRowClicked(element: Question) {
    this.selectedQuestion = element;
    this.isQuestionSelect = true;
  }

  returnQuestionsTable(){
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
