export class Question {
  id: number;
  userId: number;
  questionText: string;
  categoryId: number;

  constructor(){
    this.id = 0;
    this.userId = 0;
    this.questionText = '';
    this.categoryId = 0;
  }
}
