export class Answer {
  id: number;
  questionId: number;
  userName: string;
  content: string;

  constructor(){
    this.id = 0;
    this.questionId = 0;
    this.userName = '';
    this.content = '';
  }
}
