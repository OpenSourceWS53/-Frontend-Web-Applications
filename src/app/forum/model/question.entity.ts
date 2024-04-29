export class Question {
  id: number;
  userName: string;
  ask: string;
  category: string;
  date: Date;

  constructor(){
    this.id = 0;
    this.userName = '';
    this.ask = '';
    this.category = '';
    this.date = new Date();
  }
}
