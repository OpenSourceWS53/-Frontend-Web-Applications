export class Product {
  id: number;
  sowingId: number;
  name: string;
  quantity: number;
  productType: string;
  appliedDate: string;
  constructor() {
    this.id = 0;
    this.sowingId = 0;
    this.name = "";
    this.quantity = 0;
    this.productType = "";
    this.appliedDate = '';
  }
}
