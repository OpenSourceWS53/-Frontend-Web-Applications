export class Answer {
  id: number;
  questionId: number;
  userId: number;
  answerText: string;

  constructor(){
    this.id = 0;
    this.questionId = 0;
    this.userId = 0;
    this.answerText = '';
  }
}
