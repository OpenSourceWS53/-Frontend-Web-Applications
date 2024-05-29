export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  subscriptionId: number;
  constructor() {
    this.id = 0;
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.password = "";
    this.subscriptionId = 0;
  }
}
