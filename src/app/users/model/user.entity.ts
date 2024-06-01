export class User {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  subscriptionId: number;
  constructor() {
    this.id = 0;
    this.firstName = "";
    this.lastName = "";
    this.userName = "";
    this.email = "";
    this.password = "";
    this.subscriptionId = 0;
  }
}
