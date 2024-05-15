export class Product {
  "id": number;
  "cropId": number;
  "date": Date;
  "type": string;
  "name": string;
  "quantity": string;
  constructor() {
    this.id = 0;
    this.cropId = 0;
    this.date = new Date();
    this.type = "";
    this.name = "";
    this.quantity = "";
  }
}
