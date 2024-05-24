export class Product {
  id: number;
  sowing_id: number;
  date: string;
  type: string;
  name: string;
  quantity: string;
  constructor() {
    this.id = 0;
    this.sowing_id= 0;
    this.date = '';
    this.type = "";
    this.name = "";
    this.quantity = "";
  }
}
